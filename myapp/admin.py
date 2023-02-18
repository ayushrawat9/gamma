from django.contrib import admin
from .models import MyList
# Register your models here.

class MyListAdmin(admin.ModelAdmin):
    list_display = ('title','description','completed')

admin.site.register(MyList,MyListAdmin)
