from django.urls import path
from products.api.views import (
    api_view,
    product_detail_view,
    OrderSummaryView,
    ProductsListView,
    add_to_cart,
    remove_from_cart,
    CountryListView,
    OrderAddressCreateView,
    OrderItemDeleteView,
    get_shipping_address,
    message_view,
    set_shipping_fee,
    AddressUpdateView,
    address_create_view,
    address_list_view,
    AddressDeleteView,
    countyListView,
    cityListView
)

app_name = 'products'

urlpatterns = [
    path('', api_view, name='products-view'),

    # products
    path('products/', ProductsListView.as_view(), name='products-list'),
    path('products/<slug>/', product_detail_view, name='products-detail'),

    # Address
    path('shipping-address/', get_shipping_address, name='shipping-address'),
    path('address-list/', address_list_view, name='address-list'),
    path('order-address/create/', OrderAddressCreateView.as_view(), name='order-address-create'),
    path('address/create/', address_create_view, name='address-create'),
    path('address/<pk>/update/', AddressUpdateView.as_view(), name='address-update'),
    path('address/<pk>/delete/', AddressDeleteView.as_view(), name='address-delete'),

    # Cart & Order Summary
    path('add-to-cart/', add_to_cart, name='add-to-cart'),
    path('remove-from-cart/<ref_code>/', remove_from_cart, name='remove-from-cart'),
    path('order-summary/', OrderSummaryView.as_view(), name='fetch-cart'),
    path('order-items/<pk>/delete/', OrderItemDeleteView.as_view(), name='order-items-delete'),

    # Others
    path('countries/', CountryListView.as_view(), name='country-list'),
    path('counties/', countyListView, name='counties-list'),
    path('cities/', cityListView, name='cities-list'),
    path('message/', message_view, name='message'),
    path('shipping-fee/', set_shipping_fee, name='shipping-fee'),
]

