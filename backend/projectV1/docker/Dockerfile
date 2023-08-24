# Use Python 3.8 base image
FROM python:3.8

# Set working directory
WORKDIR /app

# Install psycopg2 and pyarrow dependencies in one layer
RUN apt-get update && apt-get install -y libpq-dev gcc && \
    pip install psycopg2-binary pyarrow

# Copy requirements and install
COPY ./projectV1/requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire app
COPY ./projectV1 /app

# Don't migrate here; remove this
# RUN python /app/manage.py migrate

# Collect static files
RUN python /app/manage.py collectstatic --no-input

# Create volumes  
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

ENV MEDIA_ROOT /vol/web/media
ENV STATIC_ROOT /vol/web/static

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "projectV1.wsgi:application"]
