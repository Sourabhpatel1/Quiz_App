from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('add-question/', views.addquestion, name='addquestion'),
    path('quizes', views.quizes, name='quizes'),
    path('quiz/<int:pk>/', views.quiz, name='quiz'),
    path('add-exam/', views.category, name='addexam'),
]
