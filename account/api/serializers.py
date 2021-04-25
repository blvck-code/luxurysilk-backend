from rest_framework import serializers
from account.models import Account, Profile
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_bytes, smart_str, force_text, DjangoUnicodeDecodeError, force_str

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password']

    def save(self, **kwargs):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Account
        fields = ['id', 'email', 'username',]

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=60)
    password = serializers.CharField(max_length=30)

    class Meta:
        model = Account
        fields = ("email", "password")
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid login')

class RequestResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=60)

    class Meta:
        fields = ['email']

class SetNewPasswordSerializer():
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True
    )
    token = serializers.CharField(
        min_length=1, write_only=True
    )
    uidb64 = serializers.CharField(
        min_length=1, write_only=True
    )

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(pk=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The link is invalid', 401)

            if len(password) < 6:
                raise AuthenticationFailed('Passwords must be at least 6 characters long.', 401)

            user.set_password(password)
            user.save()

        except Exception as e:
            raise AuthenticationFailed('The link is invalid', 401)
        return super().validate(attrs)

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['image', 'first_name', 'last_name', 'phone_number']

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    class Meta:
        model = Account
        fields = ['old_password', 'confirm_new_password', 'new_password']
