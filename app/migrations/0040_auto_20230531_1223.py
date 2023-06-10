# Generated by Django 2.2.27 on 2023-05-31 12:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0039_categorystyle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categorystyle',
            name='measuring_category',
            field=models.OneToOneField(help_text='Geometry related to this Category', on_delete=django.db.models.deletion.PROTECT, to='app.MeasuringCategory', verbose_name='Measuring Category'),
        ),
    ]