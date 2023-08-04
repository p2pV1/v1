# Use Python 3.8 base image
FROM python:3.8

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY ./projectV1/requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY ./projectV1/myapp /app/myapp
COPY ./projectV1/projectV1 /app/projectV1
COPY ./projectV1/manage.py /app

# Migrate database
RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --no-input 

# Launch app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "projectV1.wsgi:application"]