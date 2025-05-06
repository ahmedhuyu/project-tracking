from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('project', views.ProjectViewSet, basename='project')
router.register('projectmanager', views.ProjectManagerViewSet, basename='projectmanager')

urlpatterns = router.urls

# urlpatterns = [
#     path('', views.home)
# ]