from django.db import models


class BestConfig(models.Model):
    n_estimators = models.PositiveIntegerField()
    accuracy = models.FloatField()

    def __str__(self):
        return f"n_estimators: {self.n_estimators}, accuracy: {self.accuracy}"
