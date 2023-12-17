# Use Python 3.8 base image
FROM python:3.8

# Set working directory
WORKDIR /app

# Install psycopg2 dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc && \
    pip install psycopg2-binary

# Install other dependencies
RUN pip install gunicorn uvicorn

RUN apt-get update && apt-get install -y redis-server

# Copy requirements and install Python dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Set environment variable for Django settings
ENV DJANGO_SETTINGS_MODULE=projectV1.settings

# Copy the entire app
COPY . /app

# Collect static files
RUN python manage.py collectstatic --no-input

# Create volumes for media and static files
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

# Set environment variables for media and static files
ENV MEDIA_ROOT=/vol/web/media
ENV STATIC_ROOT=/vol/web/static

# Expose the port that your application will run on
EXPOSE 8080 6379

# Set the entrypoint to run your ASGI application with Uvicorn
CMD ["uvicorn", "projectV1.asgi:application", "--host", "0.0.0.0", "--port", "8080"]
