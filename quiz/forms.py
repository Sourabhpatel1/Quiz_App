from django.forms import ModelForm
from .models import ExamName, Question

class ExamForm(ModelForm):
    class Meta:
        model = ExamName
        fields = '__all__'

class QuestionForm(ModelForm):
    class Meta:
        model = Question
        fields = '__all__'


