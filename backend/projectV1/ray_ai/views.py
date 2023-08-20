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
    return model.score(X_test, y_test)


def ray_train_view(request):
    config = {
        "n_estimators": tune.grid_search([10, 25, 50, 75, 100])
    }
    analysis = tune.run(train_model, config=config)
    best_config = analysis.get_best_config(metric="mean_accuracy")
    best_accuracy = analysis.get_best_result()["mean_accuracy"]

    context = {
        'best_n_estimators': best_config["n_estimators"],
        'best_accuracy': best_accuracy
    }
    return render(request, 'ray_ai/actors.html', context)


def index(request):
    return render(request, 'index.html')
