from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()

    def get_name(self):
        return self.name

    def get_age(self):
        return self.age


class BestConfig(models.Model):
    n_estimators = models.PositiveIntegerField()
    accuracy = models.FloatField()
