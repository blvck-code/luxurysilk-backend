from django.contrib import admin
from products.models import (
    Items,
    OrderItem,
    Order,
    BillingAddress,
    Messages,
    Address
)

admin.site.register(Items)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Address)
admin.site.register(BillingAddress)
admin.site.register(Messages)
