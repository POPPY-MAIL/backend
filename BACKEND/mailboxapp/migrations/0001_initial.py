# Generated by Django 3.2.6 on 2021-08-21 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accountapp', '0004_alter_appuser_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='MailBox',
            fields=[
                ('id', models.BigIntegerField(db_column='mailbox_id', primary_key=True, serialize=False)),
                ('nickname', models.CharField(max_length=20)),
                ('link_title', models.CharField(max_length=40)),
                ('mailbox_link', models.URLField()),
                ('open_date', models.DateTimeField()),
                ('key', models.CharField(db_column='mailbox_key', max_length=50)),
                ('theme', models.CharField(choices=[('RED', 'Red'), ('YELLOW', 'Yellow'), ('ORANGE', 'Orange')], max_length=20, null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mailboxes', to='accountapp.appuser')),
            ],
            options={
                'db_table': 'mailbox',
            },
        ),
    ]
