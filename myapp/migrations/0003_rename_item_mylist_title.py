# Generated by Django 4.1.4 on 2023-02-18 16:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_rename_status_mylist_completed'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mylist',
            old_name='item',
            new_name='title',
        ),
    ]