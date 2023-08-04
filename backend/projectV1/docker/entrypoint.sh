#!/bin/sh

# Collect static files 
python /code/manage.py collectstatic --noinput

# Apply database migrations
python /code/manage.py migrate

# Start server
gunicorn --bind 0.0.0.0:8000 projectV1.wsgi:application