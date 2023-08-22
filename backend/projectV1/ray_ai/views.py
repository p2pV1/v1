from django.shortcuts import render
from django.http import JsonResponse
import ray
from ray import tune
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import logging

logger = logging.getLogger(__name__)

# Note: No Django imports here.


def train_model(config):
    try:
        iris = load_iris()
        X = iris.data
        y = iris.target
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2)

        model = RandomForestClassifier(n_estimators=config["n_estimators"])
        model.fit(X_train, y_train)
        return {"accuracy": model.score(X_test, y_test)}
    except Exception as e:
        logger.error(f"Error during training: {e}")
        return {"accuracy": 0.0}


def ray_train_view(request):
    # Import within the function to avoid issues with Ray.
    from .models import BestConfig

    context = {}
    try:
        ray.init(ignore_reinit_error=True)
        config = {
            "n_estimators": tune.grid_search([10, 25, 50, 75, 100])
        }
        analysis = tune.run(train_model, config=config,
                            metric="accuracy", mode="max")
        best_trial = analysis.get_best_trial(metric="accuracy", mode="max")
        best_config = best_trial.config
        best_accuracy = best_trial.last_result["accuracy"]

        # Save to database here, inside Django's context.
        best_config_db = BestConfig(
            n_estimators=best_config["n_estimators"], accuracy=best_accuracy)
        best_config_db.save()

        context = {
            'best_n_estimators': best_config["n_estimators"],
            'best_accuracy': best_accuracy
        }
    except Exception as e:
        logger.error(f"Error during ray_train_view: {e}")
        context = {
            'error': f"An error occurred: {e}"
        }
    return render(request, 'ray_ai/actors.html', context)


def index(request):
    return render(request, 'index.html')
