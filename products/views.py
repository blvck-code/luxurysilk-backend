from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

@api_view(['GET', ])
@permission_classes([])
@authentication_classes([])
def apiOverview(request):
    api_urls = {
        'Login': '/api/login/',
        'Register': '/api/register/',
        'Logout (Token Required)': '/api/logout/',
        'User (Token Required)': '/api/user/',
        'Activate Account': '/api/activate/<uidb64>/<token>/',
        'Password Reset': '/api/password-reset/<uidb64>/<token>/',
        'Password Reset Complete': '/api/password-reset-complete/',
        'Reset Password': '/api/request-reset-password/',

        'Country List': '/api/countries/',
        'Products List': '/api/products/',
        'Product Detail': '/api/products/<slug>/',
        'Search Product': '/api/products?search=<name>&ordering=<price>&page=<number>/',
        'Add to cart (Token Required)': '/api/add-to-cart/',
        'Remove from cart (Token Required)': '/api/remove-from-cart/',
        'Delete Order (Token Required)': '/api/order-items/<ref_code>/delete/',
        'Order Summary (Token Required)': '/api/order-summary/',
        'User Address List (Token Required)': '/api/address-list/',
        'Update Address (Token Required)': '/api/address/<pk>/update/',
        'Delete Address (Token Required)': '/api/address/<pk>/delete/',
        'Order Address Create (Token Required)': '/api/order-address/create/',
        'Shipping Address (Token Required)': '/api/shipping-address/',
        'Shipping Fee (Token Required)': '/api/shipping-fee/',
        'Create Address (Token Required)': '/api/address/create/',
        'Cities': '/api/cities/',
        'Counties': '/api/counties/',
        'Contact Us': '/api/message/',
        'Subscribe Email': '/api/subscribe/',
    }
    return Response(api_urls)

