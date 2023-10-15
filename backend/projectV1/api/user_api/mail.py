from django.utils.timezone import now
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.core.mail import send_mail
from registration.models import Token

def verification_token(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + timedelta(days=1) 
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

def send_verification_email(user, token):
    verification_link = f"http://127.0.0.1:8000/verify-email?token={token}"
    subject = "Verify your email"
    message = f"Click the link to verify your email: {verification_link}"
    from_email = "capstone0023@gmail.com"
    recipient_list = [user.email]
    send_mail(subject, message, from_email, recipient_list)

def send_password_email(user, token):
    valid_till = now() + timedelta(minutes=30)
    try:
        token_model = Token.objects.get(user_id=user.id)
        token_model.valid_till = valid_till
        token_model.token = token
        token_model.save()
    except Token.DoesNotExist:
        token_model = Token()
        token_model.valid_till = valid_till
        token_model.token = token
        token_model.user = user
        token_model.save()

    subject = "Change your password"
    message = f"This is your token to change password: {token}"
    from_email = "capstone0023@gmail.com"
    recipient_list = [user.email]
    send_mail(subject, message, from_email, recipient_list)