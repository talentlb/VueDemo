# Generated by Django 3.1 on 2020-12-17 16:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='rolesKey',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='web.roles'),
        ),
    ]
