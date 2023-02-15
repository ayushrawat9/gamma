from django.contrib import admin
from .models import MyList
# Register your models here.

class MyListAdmin(admin.ModelAdmin):
    list_display = ('item','description','status')

admin.site.register(MyList,MyListAdmin)
