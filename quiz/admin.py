from django.contrib import admin
from .models import ExamName, Question, Answer
# Register your models here.



admin.site.register(ExamName)
admin.site.register(Question)
admin.site.register(Answer)