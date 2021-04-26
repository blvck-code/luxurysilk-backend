from rest_framework.response import Response
from django.shortcuts import redirect, render
from django.http.response import HttpResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from account.api.serializers import (
    RegisterSerializer,
    UserSerializer,
    ProfileSerializer,
    LoginSerializer,
    RequestResetPasswordSerializer,
    SetNewPasswordSerializer,
    ChangePasswordSerializer
)
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django.template.loader import render_to_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes, smart_str, force_text, DjangoUnicodeDecodeError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from validate_email import validate_email
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.authtoken.models import Token
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.mail import EmailMessage
from rest_framework import generics, status
from account.models import Account, Profile
from account.api.token_generator import generate_token
from django.contrib.auth import authenticate
from validate_email import validate_email
import threading

#THREADING
class EmailThread(threading.Thread):
    def __init__(self):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send(fail_silently= False)

#SUBSCRIBE API
@api_view(['POST',])
@permission_classes((AllowAny,))
@authentication_classes([])
def subscriptionView(request, *args, **kwargs):
    email = request.data.get('email')

    try:
        account = Account.objects.get(email=email)
        account.subscribed = True
        account.save()
        return Response(status=status.HTTP_200_OK)

    except Account.DoesNotExist:
        return Response({
            'message': "Please create an account with us to get our latest updates"
        }, status=status.HTTP_400_BAD_REQUEST)

#REGISTER API
@api_view(['POST',])
@permission_classes((AllowAny,))
@authentication_classes([])
def register_view(request, *args, **kwargs):

    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')

    if not validate_email(email):
        return Response({'error':'Please provide a valid email address'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if Account.objects.get(email=email):
            return Response({'error': 'Email address is already taken'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as identifier:
        pass

    if len(password) < 6:
        return Response({'error': 'Passwords must be at least 6 characters long.'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        account = serializer.save(commit=False)
        account.is_active = False
        account.save()

        email_subject = 'Activate your account'
        user = account
        domain = get_current_site(request).domain
        # domain = '127.0.0.1:3000'
        uidb64= urlsafe_base64_encode(force_bytes(account.pk))
        token = generate_token.make_token(account)
        relativeLink = reverse('auth:activate', kwargs={
            'uidb64': uidb64,
            'token': token
        })
        absurl = f'http://{domain}{relativeLink}'
        email_body = f'Hello {user.username}, \nPlease click on the link below to activate your account: \n {absurl}'
        email_message = EmailMessage(
            email_subject,
            email_body,
            'noreply@blvck.com',
            [user.email]
        )

        EmailThread(email_message).start()

        return Response({'success':f"We've sent an email to {account.email}. Open it up to activate your account."}, status=status.HTTP_200_OK)

    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ACTIVATE ACCOUNT
@api_view(['GET',])
@permission_classes((AllowAny,))
@authentication_classes([])
def activate_account(request, uidb64, token):
    context = {}

    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Account.objects.get(pk=uid)

        if user is not None and generate_token.check_token(user, token):
            if not user.is_active:
                user.is_active = True
                user.save()
                return redirect('http://localhost:3000/login', {'message': 'Your account have been activated, you can now login'})
            else:
                return Response({'error': 'Your account is already active, you cannot use this link twice.'}, status=status.HTTP_400_BAD_REQUEST)

    except Exception:
        user = None
        return Response({'error':'Something went wrong, please re request activation link again'})

    else:
        return Response({'error': 'Something went wrong, please re request activation link again'}, status=status.HTTP_400_BAD_REQUEST)

# USER API
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
@authentication_classes([TokenAuthentication, ])
def userAPI(request):
    user = request.user
    data = {}
    serializer = UserSerializer(user)
    data['email'] = user.email
    data['username'] = user.username
    data['token'] = Token.objects.get(user=user).key
    data['is_active'] = user.is_active
    return Response(data)

# LOGIN API
@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def loginAPI(request):
    context={}

    email = request.data.get('email')
    password = request.data.get('password')
    account = authenticate(email=email, password=password)
    if account:
        try:
            token = Token.objects.get(user=account)
        except Token.DoesNotExist:
            token = Token.objects.create(user=account)
        context['is_active'] = account.is_active
        context['username'] = account.username
        context['email'] = email.lower()
        context['token'] = token.key
        return Response(context)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# LOGOUT API
@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
@authentication_classes([TokenAuthentication, ])
def logoutAPI(request):
    return Response(status=204)

#RESET PASSWORD API
@api_view(['POST'],)
@permission_classes([])
@authentication_classes([])
def requestResetPasswordView(request, *args, **kwargs):
    email = request.data.get('email')

    if not validate_email(email):
        return Response({'message':'Please enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

    if Account.objects.filter(email=email).exists():
        user = Account.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        domain = get_current_site(request).domain
        relativeLink = reverse('auth:password-reset-confirm', kwargs={
            'uidb64': uidb64,
            'token': token
        })
        absurl = f'http://{domain}{relativeLink}'
        email_body = 'Hello, \nUse the link below to reset your password. \n' + absurl
        email_message = EmailMessage(
            'Reset your password',
            email_body,
            'noreply@blvck.com',
            [user.email]
        )

        EmailMessage(email_message).start()
        return Response({
            'message': 'We have sent you a link to reset your password.'},
            status=status.HTTP_200_OK
        )
    else:
        return Response({
            'message': 'We have sent you a link to reset your password.'},
            status=status.HTTP_200_OK
        )

#PASSWORD CHECK API
@api_view(['GET'],)
@permission_classes([])
@authentication_classes([])
def passwordCheckAPI(request, uidb64, token, *args, **kwargs):

    context={}

    try:
        id = smart_str(urlsafe_base64_decode(uidb64))
        user = Account.objects.get(pk=id)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({
                'error':True,
                'message':'Token is not valid, please request a new one.',
            }, status=status.HTTP_401_UNAUTHORIZED)
        context['success'] = True
        context['message'] = 'Credentials valid.'
        context['uidb64'] = uidb64
        context['token'] = token

        return render(request, 'auth/ResetPassword.html', context)
        # return Response({
        #     'success':True,
        #     'message':'Credentials valid.',
        #     'uidb64':uidb64,
        #     'token':token
        # }, status=status.HTTP_200_OK)
    except DjangoUnicodeDecodeError as e:
        context['error'] = True
        context['message'] = 'Token is not valid, please request a new one.'

    return render(request, 'auth/ResetPassword.html', context)

#SET NEW PASSWORD API
class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            'success':True,
            'message':'Password reset successful'
        }, status=status.HTTP_200_OK)

#USER ID API
@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def user_id(request):
    return Response({'userID':request.user.id}, status=status.HTTP_200_OK)

#USER PROFILE
@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def user_profile(request):
    user = request.user
    profile = Profile.objects.get(user=user)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

#  CHANGE PASSWORD
class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = Account
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        account = self.get_object()
        serializer = self.get_serializer(data= request.data)

        if serializer.is_valid():

            old_password = serializer.data.get('old_password')
            new_password = serializer.data.get('new_password')
            confirm_new_password = serializer.data.get('confirm_new_password')

            #check old password
            if not account.check_password(old_password):
                return Response({'password': 'Wrong password.'}, status= status.HTTP_400_BAD_REQUEST)

            # confirm new password match
            if new_password != confirm_new_password:
                return Response({'password': 'New passwords must match'}, status=status.HTTP_400_BAD_REQUEST)

            #set password
            account.set_password(new_password)
            account.save()
            return Response({'message': 'Successfully changed password'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# EDIT USER DETAILS
@api_view(['PUT'],)
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def editUserDetails(request, *args, **kwargs):

    user = request.user
    username= request.data.get('user_name')
    firstname= request.data.get('first_name')
    lastname= request.data.get('last_name')
    email= request.data.get('email')
    phone= request.data.get('phone')

    account_data = {
        "username": username,
        "email": email
    }



    print(account_data)

    try:
        account= Account.objects.get(username=user)
        profile = Profile.objects.get(user_id=account.id)

        account_serializer = UserSerializer(data=account_data)

        account.username = username
        account.email = email

        profile.first_name= firstname
        profile.last_name= lastname
        profile.phone_number= phone

        account.save()
        profile.save()

        return Response({'message': 'Profile saved successfully.'}, status=status.HTTP_200_OK)
    except Account.DoesNotExist:
        return Response({'error': 'Account does not exit!'}, status=status.HTTP_400_BAD_REQUEST)