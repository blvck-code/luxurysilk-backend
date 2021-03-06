# Generated by Django 3.2 on 2021-04-23 06:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact', models.CharField(max_length=30)),
                ('first_name', models.CharField(blank=True, max_length=60, null=True)),
                ('last_name', models.CharField(blank=True, max_length=60, null=True)),
                ('address', models.TextField()),
                ('apartment', models.CharField(max_length=100)),
                ('state_or_region', models.CharField(choices=[('NR', 'Nairobi County'), ('KS', 'Kisumu County'), ('VI', 'Voi County'), ('SY', 'Siaya County (40600)'), ('NE', 'Nyeri County'), ('MR', 'Muranga County'), ('KR', 'Kirinyaga County')], max_length=2)),
                ('city', models.CharField(choices=[('NR', 'Nairobi City'), ('KS', 'Kisumu City'), ('VI', 'Voi Town'), ('SY', 'Siaya Town'), ('NE', 'Nyeri Town'), ('MR', 'Muranga Town'), ('KR', 'Kirinyaga Town')], max_length=2)),
                ('default', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Items',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_code', models.CharField(blank=True, max_length=100, null=True)),
                ('title', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=1000)),
                ('category', models.CharField(choices=[('S', 'Shampoo'), ('O', 'Hair Oil'), ('M', 'Moisturizer')], max_length=1)),
                ('description', models.TextField()),
                ('sold_out', models.BooleanField(default=False)),
                ('image', models.ImageField(upload_to='products')),
                ('slug', models.SlugField(blank=True, max_length=200, null=True)),
                ('boxing', models.CharField(max_length=80)),
                ('hair_type', models.CharField(max_length=80)),
                ('material', models.CharField(choices=[('C', 'Cream'), ('O', 'Liquid Oil')], max_length=1)),
                ('weight', models.CharField(choices=[('0.25', '250g'), ('0.5', '500g'), ('0.7', '750g')], max_length=6)),
                ('safety', models.TextField()),
                ('use_time', models.TextField()),
                ('ingredients', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=120)),
                ('subject', models.CharField(max_length=150)),
                ('message', models.TextField()),
                ('read', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True, verbose_name='timestamp')),
            ],
        ),
        migrations.CreateModel(
            name='Recommend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recommend', models.CharField(max_length=100)),
                ('item', models.ManyToManyField(to='products.Items')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_code', models.CharField(blank=True, max_length=100, null=True)),
                ('ordered', models.BooleanField(default=False)),
                ('quantity', models.IntegerField(default=1)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.items')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('ordered_date', models.DateTimeField()),
                ('ordered', models.BooleanField(default=False)),
                ('shipping_fee', models.DecimalField(blank=True, decimal_places=2, max_digits=1000, null=True)),
                ('address', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.address')),
                ('items', models.ManyToManyField(to='products.OrderItem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Features',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('features', models.CharField(max_length=100)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.items')),
            ],
        ),
        migrations.CreateModel(
            name='BillingAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=60, null=True)),
                ('last_name', models.CharField(blank=True, max_length=60, null=True)),
                ('phone_number', models.CharField(max_length=30)),
                ('delivery_address', models.CharField(max_length=100)),
                ('state_or_region', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('default', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
