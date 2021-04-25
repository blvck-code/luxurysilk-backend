from rest_framework import serializers
from products.models import Items, OrderItem, Order, BillingAddress,  Messages, Address

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class ProductsSerializers(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    weight = serializers.SerializerMethodField()
    material = serializers.SerializerMethodField()

    class Meta:
        model = Items
        fields = ['ref_code', 'title', 'price',  'category',
                  'sold_out','description', 'image', 'slug',
                  'boxing', 'weight', 'material',
                  'hair_type', "safety", 'use_time', "ingredients"
        ]

    def get_category(self, obj):
        return obj.get_category_display()

    def get_weight(self, obj):
        return obj.get_weight_display()

    def get_material(self, obj):
        return obj.get_material_display()

class OrderItemSerializer(serializers.ModelSerializer):
    item = StringSerializer()
    item_obj = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id',
            'item',
            'item_obj',
            'quantity',
            'final_price',
        ]
    def get_item_obj(self, obj):
        return ProductsSerializers(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()

class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    order_final = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'order_items',
            'total',
            'order_final'
        ]

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()

    def get_order_final(self, obj):
        return obj.get_order_total()

class AddAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = [
            'id', 'user', 'contact', 'first_name', 'last_name',
            'address', 'apartment', 'city', 'state_or_region',
            'default'
        ]

class AddressSerializer(serializers.ModelSerializer):
    state_or_region = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = [
            'id', 'user', 'contact', 'first_name', 'last_name',
            'address', 'apartment', 'city', 'state_or_region',
            'default'
        ]

    def get_state_or_region(self, obj):
        return obj.get_state_or_region_display()

    def get_city(self, obj):
        return obj.get_city_display()

class AddressListSerializer(serializers.ModelSerializer):
    state_or_region = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = [
            'id', 'user', 'contact', 'first_name', 'last_name',
            'address', 'apartment', 'city', 'state_or_region',
            'default'
        ]

    def get_state_or_region(self, obj):
        return obj.get_state_or_region_display()

    def get_city(self, obj):
        return obj.get_city_display()

class ShippingAddressSerializer(serializers.ModelSerializer):
    state_or_region = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = [
            'user', 'contact', 'first_name', 'last_name',
            'address', 'apartment', 'city', 'state_or_region',
            'default'
        ]

    def get_state_or_region(self, obj):
        return obj.get_state_or_region_display()

    def get_city(self, obj):
        return obj.get_city_display()


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = [
            'name',
            'email',
            'subject',
            'message',
            'timestamp'
        ]