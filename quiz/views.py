from email import message
from django.shortcuts import render, redirect
from django.forms import inlineformset_factory
from .models import Question, Answer, ExamName
from .forms import QuestionForm, ExamForm
from django.contrib import messages

# Create your views here.

def index(request):
    return render(request, 'index.html')

def addquestion(request):
    AnswerFormSet = inlineformset_factory(Question, Answer, fields='__all__', extra=4, can_delete=False)
    form = QuestionForm(request.POST or None)
    formset = AnswerFormSet(request.POST or None)
    context = {
        'form' : form,
        'formset' : formset,
    }
    if request.method == "POST":
        if form.is_valid() and formset.is_valid():
            question = form.save(commit=False)
            exam_name = ExamName.objects.get(id=int(request.POST["exam_name"]))
            question.exam_name = exam_name
            question.save()
            for form in formset.forms:
                answer = form.save(commit=False)
                question_instance = Question.objects.get(id=question.id)
                answer.question = question_instance
                answer.save()
            messages.add_message(request, messages.INFO, "Question Added Succesfully")
            return redirect('addquestion')
        else:
            messages.add_message(request, messages.INFO, "Something Went Wrong")
            return redirect ('addquestion')
    return render(request, 'addquestion.html', context=context)


def category(request):
    form = ExamForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        cat = form.save()
        cat.save()
        messages.add_message(request, messages.INFO, f"Exam {cat.name} Added Succesfully.")
        return redirect('addexam')
    return render(request, 'examname.html', {'form' : form})


def quizes(request):
    all_quizes = list(ExamName.objects.all())
    return render(request, 'quizes.html', {'all_quizes' : all_quizes})


def quiz(request, pk):
    exam_name = ExamName.objects.get(id=pk)
    questions = Question.objects.filter(exam_name=exam_name)
    data = {}
    for question in questions:
        answers = {}
        answer = Answer.objects.filter(question=question.id).values()
        for j, ans in enumerate(answer):
            answers["answer-" + str(j)] = [ans["option"], ans["correct"]]
            data[question] = answers

    context = {
            'data' : data
        }
    return render(request, 'quiz.html', context=context)

