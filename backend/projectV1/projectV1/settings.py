import os
import signal
from pathlib import Path
from decouple import config
from decouple import config
import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='django-insecure-kg-kbz7^ve7!z@v0gmh9-nc^b9ek&ocn5b!h(%_s82a^dczx@2a')



# Use client-side (browser) cache for session management
SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'

# Configure a unique name for the session cookie
SESSION_COOKIE_NAME = 'pplendeverest'

# Optionally, set the session cookie age (duration) in seconds
SESSION_COOKIE_AGE = 86400  # Set to 1 day (86400 seconds)

# Set SESSION_COOKIE_SECURE to True if using HTTPS in production
SESSION_COOKIE_SECURE = True

# SESSION_COOKIE_AGE = 172800

DEBUG = True

IN_DOCKER = False

CORS_ALLOW_ALL_ORIGINS = True

# Update the backend and frontend URLs
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://frontend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
    "https://backend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://frontend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
    "https://backend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
    "https://frontend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
    "https://backend-service-rojjrgeqna-ue.a.run.app",  # Update this URL
]

CORS_ALLOW_CREDENTIALS = True

ALLOWED_HOSTS = ['backend-service-rojjrgeqna-ue.a.run.app','backend', 'localhost', '127.0.0.1','a.run.app']

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
    'room',
    'channels',
    'registration',
    'audio_conference',
    'corsheaders',
    'api',
]


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        '': {  # root logger
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

logger.debug("DJANGO_SETTINGS_MODULE: %s", os.environ.get("DJANGO_SETTINGS_MODULE"))

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

ASGI_APPLICATION = 'projectV1.asgi.application'

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

#WSGI_APPLICATION = 'projectV1.wsgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('redis', 6379)],
        },
    },
}

# Specify the ASGI application (required for channels)
ASGI_APPLICATION = 'projectV1.asgi.application'
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


print("Database Configuration:")
print(f"NAME: {DATABASES['default']['NAME']}")
print(f"USER: {DATABASES['default']['USER']}")
print(f"PASSWORD: {DATABASES['default']['PASSWORD']}")
print(f"HOST: {DATABASES['default']['HOST']}")
print(f"PORT: {DATABASES['default']['PORT']}")

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


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'capstone0023@gmail.com'
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='rrft lujl hfez xkqr')  # Update this line


SESSION_COOKIE_DOMAIN = '.a.run.app'


GOOGLE_CLOUD_STORAGE_SETTINGS = {
    'GS_BUCKET_NAME': 'pplendbackend',  # Your bucket name
    'GS_PROJECT_ID': 'pplendeverest',    # Your project ID
    'GS_LOCATION': 'us',                # Your location
    'GS_CREDENTIALS': {
        "type": "service_account",
        "project_id": "pplendeverest",
        "private_key_id": "ba44de2ef8d5b7758f971d3f8d29739100b5d1a5",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtYiYn8eYJHU9d\nRMyGXFKYiLEiQ7xc/7ZVPUh+ivnQbhn81gQnrRQADNnhbLV1/O4Wbt2VNF2O3tI2\nefh93uycuG+zY+A74XLaSDcmeID5K3DSAQgQimRGxC1nop1VI1+cstceLB8cRrPs\nxFyf8XrH8+J3nYZBXZfkvxGHWqpcKeVKOmYiW2x7KzhAvBnS05ld78zbMs7Sf6AQ\n4ltsfH9kAZQDx6KDY6BQitbk2w+h3GjjLP117byALbj0dUgWLZfgsQ6zU3nW5ZL/\n3DF8GTwohOb+lOY+StJF/rqsWO6p+xyKR0OT7eSZkMJyazW1tIMvN+DENvaWdTiA\n1IMKtFxxAgMBAAECggEACnxpDC7o0kHLyuYDjEJj+2t+8lsli/v/ehnDUJCVVGSo\nR96QsJlFivg8ACfGihIn5cLtk0hwD8PhnkpTppcszmX9hBxaU3zKflxHkO57obYz\nHqb8fCBGjsduwI8OPrfYNej/XMjfK820iYavBxGqyDzeLuJKcZnDEIz5YYCF/54D\n5FHAmhmy03SIDyDWaF89MNm5Np1ns9dFiWWyffoaz+TTYR+kgYRXu73CRXBnKtJr\nF0yGj056khmJticpLxEhaUgg7OwFoFuTkIbgLL4dtUqqzGrlDed7mT+c3RWEcGMA\nUlTMJd4u6/p8vckyX2hifTiRVofxaD3kUiZfuxnQvQKBgQDUDOUUrU2pwReI/9mU\nhFafdVrVm3RAgXlPC+J9agaPKL+JdyGcWsqRr0puQtTtYfarX/fNuWNKPDNFZQCp\nWfAsR+RsxScnhrmSuRyF2rDAQAa8aL7RGVSrMfP+rU70bOhDpQDoJHI+Bl1NSfPE\nPgSQe6OOXKmRtCnVzzKI9P+A1QKBgQDRUaMLUDrdLo9Q3ojkSpDVPP+juyHSx7Ix\nb5N9g75WzB64iAHuCREyO+cZTPdn/toM0scuQEP9HoxFY56JluzoSMnSAes++LDB\nieAsDl7xvoTH4kpljESGTyR4iDiJ4LSyXnCM9rxgRtIevOCwn1rI3lf/jZ/9GGDe\nJVL+UoNbLQKBgFbMOHDwR1v3B/UyFRPv361B0j6hdUJ6PPeYO8tuPOUYnt5b/0wK\n9eQQRn0/qfzJHrkjfUGeYwAeCDadk1m+0MqvWtcTFGXfhdKDJyO7UqI/EwLINWNN\n5RR2TBOxSSJP+frGbcqYMJMm88YRQVDQufmSQm6hi19yybUVLPBWqMdJAoGAc10j\nF2EokC7RHikIGYpfOKdd3ceNZLZbJ5PvHgY2KXBmnh2XsrGcoKsTO4aH9PEpDFg/\nHuackiz78mJtRjfAamVzliMonJREFub+fkmNWn8+f0vg5Qbh3YRQ/X1Wa+dEr+oM\n7iQuvoFJ3VcMH0w0pPCmX1qXCs8c1FKN401myCECgYBzCk0L4jBmcrwH92YwTQR5\nrUJC+Og1rkYrHKne0+4LmHZepx7clmn/P/eSakqjh60QHxLjm3cKHRZiTWH4yhdB\n1WDuqRH4RU9pHvPMaQR20SmE5k42MVsy+ZmDfVQJhC+o3WpSHpkIKkDuJfDU9rwV\niat4TOGCHlvtaz+TSY7LZQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "pplendbackendeverest@pplendeverest.iam.gserviceaccount.com",
        "client_id": "109840666437703497715",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/pplendbackendeverest%40pplendeverest.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
},

}