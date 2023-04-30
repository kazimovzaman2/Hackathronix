from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import Room
from django.utils.crypto import get_random_string

# Create your views here.

def index(request):
    return render(request, "index.html")

@login_required(login_url='login')
def dashboard(request):
    return render(request, "mainApp/dashboard.html")



@login_required(login_url='login')
def create_room(request):
    if request.method == 'POST':
        name = request.POST['name']
        description = request.POST['description']
        creator = request.user
        unique_link = get_random_string(length=16)

        room = Room(name=name, description=description, creator=creator, unique_link=unique_link)
        room.save()

        return redirect('room_detail', unique_link=unique_link)

    return render(request, 'mainApp/create_room.html')



def room_detail(request, unique_link):
    room = get_object_or_404(Room, unique_link=unique_link)
    context = {'room': room}
    return render(request, 'mainApp/room_detail.html', context)
