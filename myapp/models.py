from django.db import models

# Create your models here.
class MyList(models.Model):
    item = models.CharField(max_length=120)
    description = models.TextField()
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.item
