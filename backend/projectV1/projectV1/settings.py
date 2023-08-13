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

SECRET_KEY = 'django-insecure-kg-kbz7^ve7!z@v0gmh9-nc^b9ek&ocn5b!h(%_s82^dczx@2a'

DEBUG = True

ALLOWED_HOSTS = []


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'registration',
    'ray_ai',
]

MIDDLEWARE = [
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

WSGI_APPLICATION = 'projectV1.wsgi.application'

# Database config

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'everest',
        'USER': 'p2plend',
        'PASSWORD': 'P2plend98765',
        'HOST': 'everest.c56iuelp2eif.us-east-2.rds.amazonaws.com',
        'PORT': '5432',
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
