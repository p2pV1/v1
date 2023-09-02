# Generated by Django 3.2 on 2023-08-12 22:27

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=120)),
                ('password', models.CharField(max_length=120)),
                ('sub', models.CharField(max_length=120, null=True)),
                ('verified_at', models.DateTimeField(null=True)),
            ],
        ),
    ]
