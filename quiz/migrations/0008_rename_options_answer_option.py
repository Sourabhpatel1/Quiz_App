# Generated by Django 4.0.1 on 2022-01-21 19:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0007_rename_question_question_question_answer_sn'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='options',
            new_name='option',
        ),
    ]