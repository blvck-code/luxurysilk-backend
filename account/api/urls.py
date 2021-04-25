from django.urls import path
from account.api.views import (
    register_view,
    activate_account,
    userAPI,
    loginAPI,
    logoutAPI,
    requestResetPasswordView,
    passwordCheckAPI,
    SetNewPasswordView,
    subscriptionView,
    user_id,
    user_profile,
    ChangePasswordView,
    editUserDetails
)

app_name='auth'

urlpatterns = [

    path('login/',  loginAPI, name="login"),
    path('logout/', logoutAPI, name="logout"),
    path('register/', register_view, name='register'),
    path('activate/<uidb64>/<token>/', activate_account, name="activate"),

    path('user-profile/', user_profile, name="user-profile"),

    path('user/', userAPI, name='user'),
    path('user-id/', user_id, name='user-id'),
    path('edit-user/', editUserDetails, name="edit-user"),

    path('subscribe/', subscriptionView, name='subscribe'),

    path('request-reset-password/', requestResetPasswordView, name='request-reset-email'),
    path('password-reset/<uidb64>/<token>/', passwordCheckAPI, name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordView.as_view(), name='password-reset-complete'),
    path('change-password/', ChangePasswordView.as_view(), name="change-password")
]