# Use Python 3.8 base image
FROM python:3.8

# Set working directory
WORKDIR /app

# Install psycopg2 dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc 

# Install packages
RUN pip install psycopg2-binary

# Install pyarrow
RUN pip install pyarrow


# Copy requirements and install
COPY ./projectV1/requirements.txt /requirements.txt  
RUN pip install -r /requirements.txt

# Copy app code  
COPY ./projectV1/ray_ai /app/ray_ai
COPY ./projectV1/projectV1 /app/projectV1
COPY ./projectV1/registration /app/registration
COPY ./projectV1/manage.py /app

# Migrate database
RUN python /app/manage.py migrate

# Collect static files
RUN python /app/manage.py collectstatic --no-input

# Create volumes  
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

ENV MEDIA_ROOT /vol/web/media
ENV STATIC_ROOT /vol/web/static

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "projectV1.wsgi:application"]