from django.db.models.signals import pre_save, post_delete
from django_countries.fields import CountryField
from django.dispatch import receiver
from django.utils.text import slugify
from django.conf import settings
from django.db import models
import uuid

CATEGORY_CHOICES = (
    ('S', 'Shampoo'),
    ('O', 'Hair Oil'),
    ('M', 'Moisturizer')
)
MATERIAL_CHOICES = (
    ('C', 'Cream'),
    ('O', 'Liquid Oil'),
)
WEIGHT_CHOICES = (
    ('0.25', '250g'),
    ('0.5', '500g'),
    ('0.7', '750g')
)

REGION_CHOICES = (
    ('nairobi', 'Nairobi'),
    ('siaya', 'Siaya'),
    ('kisumu', 'Kisumu'),
    ('kitale', 'Kitale'),
)

class Items(models.Model):
    ref_code = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=100)
    price = models.DecimalField(decimal_places=2, max_digits=1000)
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES)
    description = models.TextField()
    sold_out = models.BooleanField(default=False)
    image = models.ImageField(upload_to='products')
    slug = models.SlugField(max_length=200, blank=True, null=True)
    boxing = models.CharField(max_length=80)
    hair_type = models.CharField(max_length=80)
    material = models.CharField(max_length=1, choices=MATERIAL_CHOICES)
    weight = models.CharField(max_length=6, choices=WEIGHT_CHOICES)
    safety = models.TextField()
    use_time = models.TextField()
    ingredients = models.TextField()

    def __str__(self):
        return self.title


@receiver(post_delete, sender=Items)
def submission_delete(sender, instance, **kwargs):
    instance.image.delete(False)

def pre_guid(sender, instance, *args, **kwargs):
    if not instance.ref_code:
        instance.ref_code = str(uuid.uuid4())
pre_save.connect(pre_guid, sender=Items)

def pre_save_product_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(str(uuid.uuid4())[:4]+'-'+instance.title)
pre_save.connect(pre_save_product_receiver, sender=Items)

class Features(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    features = models.CharField(max_length=100)

    def __str__(self):
        return self.item.title

class Recommend(models.Model):
    item = models.ManyToManyField(Items)
    recommend = models.CharField(max_length=100)

    def __str__(self):
        return self.item.title

class OrderItem(models.Model):
    ref_code = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def pre_guid(sender, instance, *args, **kwargs):
        if not instance.ref_code:
            instance.ref_code = str(uuid.uuid4())

    pre_save.connect(pre_guid, sender=Items)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_final_price(self):
        return self.quantity * self.item.price

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    address = models.ForeignKey('Address', on_delete=models.SET_NULL, blank=True, null=True)
    shipping_fee = models.DecimalField(null=True, blank=True, decimal_places=2, max_digits=1000)
    # shipping_method = models.ForeignKey('ShippingMethod', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.email

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

    def get_order_total(self):
        total = 0
        if self.shipping_fee:
            total += self.shipping_fee
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

COUNTY_CHOICES = (
    ("NR","Nairobi County"),
    ("KS", "Kisumu County"),
    ("VI", "Voi County"),
     ("SY", "Siaya County (40600)"),
     ("NE", "Nyeri County"),
     ("MR", "Muranga County"),
     ("KR", "Kirinyaga County")
     )

CITY_CHOICES = (
    ("NR","Nairobi City"),
    ("KS", "Kisumu City"),
    ("VI", "Voi Town"),
     ("SY", "Siaya Town"),
     ("NE", "Nyeri Town"),
     ("MR", "Muranga Town"),
     ("KR", "Kirinyaga Town")
     )

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact = models.CharField(max_length=30)
    first_name = models.CharField(max_length=60, blank=True, null=True)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    address = models.TextField()
    apartment = models.CharField(max_length=100)
    state_or_region = models.CharField(max_length=2, choices=COUNTY_CHOICES)
    city = models.CharField(max_length=2, choices=CITY_CHOICES)
    default = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name}  {self.last_name} Delivery Address'


class BillingAddress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60, blank=True, null=True)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    phone_number = models.CharField(max_length=30)
    delivery_address = models.CharField(max_length=100)
    state_or_region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    default = models.BooleanField(default=False)
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} Billing Address'


class Messages(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120)
    subject = models.CharField(max_length=150)
    message = models.TextField()
    read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(verbose_name='timestamp', auto_now_add=True)

    def __str__(self):
        return f'{self.name} - {self.subject}'

# class ShippingMethod(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     text = models.TextField(def)
#     price = models.DecimalField(decimal_places=2, max_digits=1000)
#     active = models.BooleanField(default=False)


