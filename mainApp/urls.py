from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("dashboard/", views.dashboard, name="dashboard"),

    
    path('create_room/', views.create_room, name='create_room'),
    path('rood_detail/<str:unique_link>/', views.room_detail, name='room_detail'),
]
