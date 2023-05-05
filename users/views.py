from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect

from .models import User

# Create your views here.



@csrf_protect
def login_view(request):
    if request.method == "POST":
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("dashboard"))
        else:
            return render(request, "users/login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "users/login.html")


def logout_view(request):
    logout(request)
    return redirect(reverse("login"))


@csrf_protect
def register(request):
    if request.method == "POST":
        email = request.POST["email"]
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "users/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, password, first_name=first_name, last_name=last_name)
            user.save()
        except IntegrityError:
            return render(request, "users/register.html", {
                "message": "Email already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("dashboard"))
    else:
        return render(request, "users/register.html")
