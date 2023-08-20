import base64
import json
import uuid
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.http import HttpResponse
import jwt
from .models import User

CLIENT_ID = "app_6c25c96f26a7c560a77e5d9e00a2090a"
CLIENT_SECRET = "sk_a9e8ea23c68d3324059a9d9ee48a6b1992ca8e62c923f9ff"
REDIRECT_URI = "http://localhost:5000/callback"
BASE_URL = "https://id.worldcoin.org"

def verify_jwt(request, token):
    jwks_url = 'https://id.worldcoin.org/jwks.json'
    response = request.get(jwks_url)
    keys = response.json()
    header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in keys['keys']:
        if key['kid'] == header['kid']:
            rsa_key = {
                'kty': key.get('kty', ''),
                'kid': key.get('kid', ''),
                'use': key.get('use', ''),
                'n': key.get('n', ''),
                'e': key.get('e', '')
            }
    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=['RS256'],
            audience=settings.CLIENT_ID,  # Access settings
            issuer='https://id.worldcoin.org'
        )
        return payload
    except Exception as e:
        print(e)
    return None

def land_page(request):
    result = {
        'success' : True,
        'message' : "User Registration Page Test",
        'data' : None
    }
    return JsonResponse(result, status=200)

def wld_login(request):
    auth_url = f"{BASE_URL}/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}"
    return redirect(auth_url, code=302)

def callback(request):
    auth_code = request.GET.get("code")
    token_url = f"{BASE_URL}/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    }
    data = {
        "code": auth_code,
        "grant_type": "authorization_code"
    }
    response = request.post(token_url, headers=headers, data=data)
    tokens = response.json()
    request.session['token'] = tokens
    token = request.session.get('token')

    try:
        payload = jwt.decode(
            token['access_token'],
            'your-secret-key',  # Replace with your actual secret key
            algorithms=['HS256']
        )
        
        sub = payload.get('sub')
        email = payload.get('email')

        if sub and email:
            user, created = User.objects.get_or_create(email=email, defaults={'sub': sub})

            if not created:
                user.email = email
                user.save()

            userinfo_url = "https://id.worldcoin.org/userinfo"
            userinfo_headers = {
                "Authorization": f"Bearer {token['access_token']}"
            }
            userinfo_response = request.post(userinfo_url, headers=userinfo_headers)
            userinfo_data = userinfo_response.json()
            tokens['user_info'] = userinfo_data

            if tokens.get('access_token'):
                request.session['access_token'] = tokens['access_token']
                session_credential_type = tokens['user_info']['https://id.worldcoin.org/beta']['credential_type']
                if session_credential_type == "orb":
                    return redirect("http://localhost:3000/lendBorrowPage")
                else:
                    return redirect("http://localhost:3000/greydashboard")
            else:
                return JsonResponse({'message': 'User Logged In!', 'status': False}, status=401)
        else:
            return JsonResponse({'message': 'Invalid token', 'status': False}, status=401)

    except jwt.ExpiredSignatureError:
        return JsonResponse({'message': 'Expired token', 'status': False}, status=401)
    except jwt.JWTError:
        return JsonResponse({'message': 'Invalid token', 'status': False}, status=401)

def view_login(request):
    if 'login' in request.session:
        login_data = request.session['login']
        return render(request, 'login.html', {'login_data': login_data})
    else:
        return HttpResponse("No user logged in")

def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Perform validation on the input data
        if not email or not password:
            return JsonResponse({'error': 'Incomplete login data'}, status=400)

        mutation = '''
        mutation($email: String!, $password: String!) {
            userLogin(email: $email, password: $password) {
                success
                user {
                    email
                }
                message
            }
        }
        '''
        variables = {
            'email': email,
            'password': password,
        }
        result = schema.execute(mutation, variable_values=variables)

        if result.errors:
            return JsonResponse({'error': str(result.errors[0])}, status=400)
        else:
            response_data = result.data['userLogin']
            if response_data.get('success'):
                user_data = response_data['user']
                request.session['login'] = {
                    'email': user_data['email']
                }
                return JsonResponse({'message': 'Login successful', 'status': True}, status=200)
            else:
                return JsonResponse({'message': 'Invalid email or password', 'status': False}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def logout(request):
    if 'login' in request.session:
        request.session.pop('login')
    return JsonResponse({'status': True}, status=200)

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        if not data:
            return JsonResponse({'error': 'No data provided'}, status=400)

        email = data.get('email')
        password = data.get('password')
        # Update 'phone_number' to 'phoneNumber' in the input data

        # Perform validation on the input data
        if not email or not password:
            return JsonResponse({'error': 'Incomplete user data'}, status=400)

        mutation = '''
        mutation($email: String!, $password: String!) {
            createUser(email: $email, password: $password) {
                user {
                    email
                    password
                }
            }
        }
        '''

        # Generate a UUID and convert it to an integer string
        id = str(uuid.uuid4().int)

        variables = {
            'email': email,
            'password': password,
        }

        result = schema.execute(mutation, variable_values=variables)

        if result.errors:
            return JsonResponse({'error': str(result.errors[0])}, status=400)

        return JsonResponse(result.data['createUser'])
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)