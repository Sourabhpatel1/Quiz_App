from unicodedata import name
from django.db import models

# Create your models here.
 

class ExamName(models.Model):
    name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Exam Name'
        verbose_name_plural = "Exam's Name"

    def __str__(self) -> str:
        return self.name

class Question(models.Model):
    exam_name = models.ForeignKey(ExamName, on_delete=models.CASCADE)
    question = models.TextField()

    class Meta:
        verbose_name = 'Question'
        verbose_name_plural = "Questions"

    def __str__(self) -> str:
        return self.question


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    sn = models.IntegerField()
    option = models.CharField(max_length=510)
    correct = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Answer'
        verbose_name_plural = "Answers"

    def __str__(self) -> str:
        return self.option