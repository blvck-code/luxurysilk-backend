from products.api.serializers import (
    ProductsSerializers,
    OrderSerializer,
    AddressSerializer,
    AddAddressSerializer,
    MessageSerializer,
    AddressListSerializer,
    AddAddressSerializer,
     ShippingAddressSerializer
)
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.generics import DestroyAPIView, CreateAPIView, UpdateAPIView
from products.models import Items, Order, OrderItem, BillingAddress, Messages, Address
from rest_framework.generics import ListAPIView,RetrieveAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django_countries import countries
from rest_framework import status
from django.utils import timezone

@api_view(['GET', ])
@permission_classes([])
@authentication_classes([])
def api_overview(request):
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
    return Response(api_urls, status=status.HTTP_200_OK)


# PRODUCTS

class ProductsListView(ListAPIView):
    queryset = Items.objects.all()
    serializer_class = ProductsSerializers
    authentication_classes = ()
    permission_classes = ()
    filter_backends = (SearchFilter, OrderingFilter,)
    search_fields = ('title', 'hair_type', 'category', 'boxing')
    pagination_class = PageNumberPagination

@api_view(['GET',])
@permission_classes([])
@authentication_classes([])
def product_detail_view(request, slug):
    try:
        item = Items.objects.get(slug=slug)
    except Items.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductsSerializers(item)
    return Response(serializer.data)


# CART & ORDER SUMMARY
@api_view(['POST',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def add_to_cart(request,*args, **kwargs):
    ref_code = request.data.get('ref_code')
    qty = request.data.get('qty')

    if ref_code is None:
        return Response({'message': 'Invalid request.'}, status=status.HTTP_404_NOT_FOUND)

    item = get_object_or_404(Items, ref_code=ref_code)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    # Check if user have an Order so as to increase the quantity of the item
    order_qs = Order.objects.filter(user=request.user,
                                    ordered=False)  # This ensures that it gets only the order that is NOT completed
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in order
        if order.items.filter(item__ref_code=item.ref_code).exists():
            order_item.quantity = qty
            order_item.save()
            return Response({'message': 'This item quantity was updated.'}, status=status.HTTP_200_OK)
        else:
            order.items.add(order_item)
            if order.items.filter(item__ref_code=item.ref_code).exists():
                order_item.quantity = qty
                order_item.save()
            return Response({'message': 'This item was added to your cart.'}, status=status.HTTP_200_OK)

    # If order queryset does NOT exists
    else:
        ordered_date = timezone.now()
        order = Order.objects.create(user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        return Response({'message': 'This item was added to your cart.'}, status=status.HTTP_200_OK)

@api_view(['DELETE',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def remove_from_cart(request, ref_code, *args, **kwargs):
    item = get_object_or_404(Items, ref_code=ref_code)
    order_qs = Order.objects.filter(
        user=request.user,
        ordered=False
    )  # This ensures that it gets only the order that is NOT completed
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in order
        if order.items.filter(item__slug=item.slug).exists():
            order_item = OrderItem.objects.filter(
                item=item,
                user=request.user,
                ordered=False
            )[0]
            order.items.remove(order_item)
            return Response({"message":'This item was removed to your cart.'}, status=status.HTTP_200_OK)
        else:
            # The order doesnt contain this OrderItem
            return Response({"message": 'This item was not in your cart.'}, status=status.HTTP_200_OK)
    else:
        # Add a message saying the user doesnt have a Order
        return Response({"message": 'You do not have an active order.'}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_200_OK)

class OrderSummaryView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            return Response({'message':'You do not have an active order.'}, status=status.HTTP_404_NOT_FOUND)

class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    queryset = OrderItem.objects.all()

class OrderAddressCreateView(CreateAPIView):
    serializer_class = AddressSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Address.objects.all()

    def post(self, *args, **kwargs):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)

            user = self.request.user
            contact = self.request.data.get('contact')
            first_name = self.request.data.get('first_name')
            last_name = self.request.data.get('last_name')
            address = self.request.data.get('address')
            apartment= self.request.data.get('apartment')
            city= self.request.data.get('city')
            state_or_region= self.request.data.get('state_or_region')
            default= self.request.data.get('default')

            if default is None:
                default = False

            if default == True:
                prev_default = Address.objects.get(user=self.request.user, default=True)

                if prev_default:
                    prev_default.default = False
                    prev_default.save()

            address = Address(
                user=user,
                first_name=first_name,
                last_name=last_name,
                contact=contact,
                apartment=apartment,
                address=address,
                state_or_region=state_or_region,
                city=city,
                default=default
            )
            address.save()
            order.address = address
            order.save()
            return Response({
                "message":"Address saved successfully."
            }, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'message': "You don't have an active order"}, status=status.HTTP_400_BAD_REQUEST)


# ADDRESSAddressUpdateView
@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def get_shipping_address(request):

    order = Order.objects.get(user= request.user, ordered=False)

    if order:
        address = order.address

        return Response({
            'id': address.id,
            'contact': address.contact,
            'first_name': address.first_name,
            'last_name': address.last_name,
            'address': address.address,
            'city': address.city,
            'apartment': address.apartment,
            'state_or_region': address.state_or_region,
            'default': address.default,
            'fee': order.shipping_fee,
        }, status=status.HTTP_200_OK)

@api_view(['GET',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def address_list_view(request):
    try:
        address = Address.objects.filter(user=request.user).order_by('-id')
    except Address.DoesNotExist:
        return Response({"message": "You don't have address created."}, status=status.HTTP_200_OK)

    serializer =AddressListSerializer(address, many=True)
    return Response(serializer.data)

@api_view(['POST',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def address_create_view(request, *args, **kwargs):
    user = request.user
    contact = request.data.get('contact')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    address = request.data.get('address')
    apartment = request.data.get('apartment')
    city = request.data.get('city')
    state_or_region = request.data.get('state_or_region')
    default = request.data.get('default')

    serializer = AddAddressSerializer(data=request.data)

    if serializer.is_valid():

        if default is None:
            default = False

        if default == True:
            try:
                prev_default = Address.objects.get(user=request.user, default=True)
                prev_default.default = False
                prev_default.save()

                address = Address(
                    user=user,
                    first_name=first_name,
                    last_name=last_name,
                    contact=contact,
                    apartment=apartment,
                    address=address,
                    state_or_region=state_or_region,
                    city=city,
                    default=default
                )

                address.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            except Address.DoesNotExist:

                address = Address(
                    user=user,
                    first_name=first_name,
                    last_name=last_name,
                    contact=contact,
                    apartment=apartment,
                    address=address,
                    state_or_region=state_or_region,
                    city=city,
                    default=default
                )
                address.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            address = Address(
                user=user,
                first_name=first_name,
                last_name=last_name,
                contact=contact,
                apartment=apartment,
                address=address,
                state_or_region=state_or_region,
                city=city,
                default=default
            )

            address.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors)


# class AddressCreateView(CreateAPIView):
#     serializer_class = AddressSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated,)
#     queryset = Address.objects.all()
#
#     def post(self, *args, **kwargs):
#         user = self.request.user
#         contact = self.request.data.get('contact')
#         first_name = self.request.data.get('first_name')
#         last_name = self.request.data.get('last_name')
#         address = self.request.data.get('address')
#         apartment= self.request.data.get('apartment')
#         city= self.request.data.get('city')
#         state_or_region= self.request.data.get('state_or_region')
#         default= self.request.data.get('default')
#
#         if default is None:
#             default = False
#
#         if default == True:
#             prev_default = Address.objects.get(user=self.request.user, default=True)
#             prev_default.default = False
#             prev_default.save()
#
#         address = Address(
#             user=user,
#             first_name=first_name,
#             last_name=last_name,
#             contact=contact,
#             apartment=apartment,
#             address=address,
#             state_or_region=state_or_region,
#             city=city,
#             default=default
#         )
#         address.save()
#         return Response({
#             "message":"Address saved successfully."
#         }, status=status.HTTP_200_OK)


class AddressUpdateView(UpdateAPIView):
    serializer_class = AddressSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Address.objects.all()

class AddressDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    queryset = Address.objects.all()

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

#OTHERS
@api_view(['POST',])
@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
def set_shipping_fee(request):
    fee = request.data.get('fee')

    try:
        order = Order.objects.get(user=request.user, ordered=False)
        order.shipping_fee = fee
        order.save()
        return Response({'message':'Successfully added delivery fee.'}, status=status.HTTP_200_OK)
    except ObjectDoesNotExist:
        return Response({'message': "You don't have an active order"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST',])
@permission_classes([])
@authentication_classes([])
def message_view(request):
    data = request.data

    serializer = MessageSerializer(data=data)
    name = request.data.get('name')
    email = request.data.get('email')
    subject = request.data.get('subject')
    message = request.data.get('message')

    if serializer.is_valid():
        message = Messages(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        message.save()
        return Response(status=status.HTTP_200_OK)
    return Response({'message':"Error!!! Message was'nt received"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET',])
@permission_classes([])
@authentication_classes([])
def countyListView(APIView):
    counties = {
    "NR": "Nairobi",
    "KS": "Kisumu",
    "TT": "Taita Taveta",
    "SY": "Siaya County (40600)",
    "NE": "Nyeri",
    "MR": "Muranga",
    "KR": "Kirinyaga",
    }
    return Response(counties)

@api_view(['GET',])
@permission_classes([])
@authentication_classes([])
def cityListView(APIView):
    cities = {
    "NR": "Nairobi City",
    "KS": "Kisumu City",
    "TT": "Voi Town",
    "SY": "Siaya Town",
    "NE": "Nyeri Town",
    "MR": "Muranga Town",
    "KR": "Kirinyaga Town",
    }
    return Response(cities)

class CountryListView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def get(self, request, *args):
        return Response(countries, status=status.HTTP_200_OK)