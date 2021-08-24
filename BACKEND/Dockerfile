FROM python:3.9.0

WORKDIR /home/

RUN echo "testingg"

RUN git clone -b be --single-branch https://github.com/POPPY-MAIL/dev.git

WORKDIR /home/dev/BACKEND/

RUN pip install -r requirements.txt

RUN pip install gunicorn

RUN pip install mysqlclient

EXPOSE 8000

CMD ["bash", "-c", "python manage.py migrate --settings=BACKEND.settings.deploy && gunicorn BACKEND.wsgi --env DJANGO_SETTINGS_MODULE=BACKEND.settings.deploy --bind 0.0.0.0:8000"]
