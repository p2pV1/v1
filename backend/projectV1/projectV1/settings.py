import os
import signal
import ray
from pathlib import Path

IN_DOCKER = 'db' not in os.environ

ray.init(ignore_reinit_error=True)


def teardown(signal, frame):
    ray.shutdown()


signal.signal(signal.SIGTERM, teardown)

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-kg-kbz7^ve7!z@v0gmh9-nc^b9ek&ocn5b!h(%_s82a^dczx@2a'

SESSION_ENGINE = 'django.contrib.sessions.backends.db'

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'default_value_if_not_set')

SESSION_COOKIE_AGE = 172800

DEBUG = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
]

CORS_ALLOW_CREDENTIALS = True

ALLOWED_HOSTS = []

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'X-CSRFToken',
    'x-requested-with',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    "knox",
    "graphene_django",
    'synthetic_data',
    'registration',
    'ray_ai',
    'audio_conference',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'projectV1.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

GRAPHENE = {
    'SCHEMA': 'registration.schema.schema',  # Update with your schema location
    'MIDDLEWARE': [
        'graphene_django.debug.DjangoDebugMiddleware',  # Enable debugging
    ],
}


WSGI_APPLICATION = 'projectV1.wsgi.application'

# Database config

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'default-db-name'),
        'USER': os.getenv('DB_USER', 'default-user'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'default-password'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Password validation
# ...

# Internationalization
# ...

# Static files

if IN_DOCKER:
    STATIC_ROOT = BASE_DIR / 'static'
else:
    STATIC_ROOT = '/app/static'

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

APPEND_SLASH = True

TEMPLATE_DIRS = [
    os.path.join(BASE_DIR, 'ray_ai', 'templates'),
]

REST_FRAMEWORK = {"DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",)}

