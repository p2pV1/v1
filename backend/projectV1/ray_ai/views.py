from django.shortcuts import render
from django.http import JsonResponse
import ray
from ray import tune
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from .models import User, BestConfig

import logging

logger = logging.getLogger(__name__)


def train_model(config):
    iris = load_iris()
    X = iris.data
    y = iris.target
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = RandomForestClassifier(n_estimators=config["n_estimators"])
    model.fit(X_train, y_train)
    return model.score(X_test, y_test)


def ray_train(request):
    config = {
        "n_estimators": tune.grid_search([10, 25, 50, 75, 100])
    }
    analysis = tune.run(train_model, config=config)
    best_config = analysis.get_best_config(metric="mean_accuracy")
    # Save to database
    BestConfig.objects.create(
        n_estimators=best_config["n_estimators"], accuracy=analysis.get_best_result()["mean_accuracy"])
    return JsonResponse({"best_config": best_config})


def actor_view(request):
    best_config_obj = BestConfig.objects.last()

    if not best_config_obj:
        n_estimators_best = 'Not available'
        accuracy_best = 'Not available'
    else:
        n_estimators_best = best_config_obj.n_estimators
        accuracy_best = best_config_obj.accuracy

    user = User.remote("Alice", 30)
    ref1 = user.get_name.remote()
    ref2 = user.get_age.remote()

    name = ray.get(ref1)
    age = ray.get(ref2)

    context = {
        'name': name,
        'age': age,
        'best_n_estimators': n_estimators_best,
        'best_accuracy': accuracy_best
    }
    return render(request, 'ray_ai/actor.html', context)


def index(request):
    return render(request, 'index.html')
