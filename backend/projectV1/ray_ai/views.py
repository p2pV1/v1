from django.shortcuts import render
from django.http import JsonResponse
import ray
from ray import tune
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

import logging

logger = logging.getLogger(__name__)


def train_model(config):
    iris = load_iris()
    X = iris.data
    y = iris.target
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = RandomForestClassifier(n_estimators=config["n_estimators"])
    model.fit(X_train, y_train)
    return {"accuracy": model.score(X_test, y_test)}


def ray_train_view(request):
    # Initialize ray, ignoring if it's already been initialized.
    ray.init(ignore_reinit_error=True)

    config = {
        "n_estimators": tune.grid_search([10, 25, 50, 75, 100])
    }
    analysis = tune.run(train_model, config=config,
                        metric="accuracy", mode="max")

    # Fetching the best config and result using the specified metric and mode
    best_trial = analysis.get_best_trial(metric="accuracy", mode="max")
    best_config = best_trial.config
    best_accuracy = best_trial.last_result["accuracy"]

    context = {
        'best_n_estimators': best_config["n_estimators"],
        'best_accuracy': best_accuracy
    }
    return render(request, 'ray_ai/actors.html', context)


def index(request):
    return render(request, 'index.html')
