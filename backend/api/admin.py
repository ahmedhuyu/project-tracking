from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Project)
admin.site.register(models.ProjectManager)
admin.site.register(models.Employees) 