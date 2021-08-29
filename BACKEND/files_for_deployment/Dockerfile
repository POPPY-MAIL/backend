FROM python:3.9.0

WORKDIR /home/

# 도커가 (혹은 portainer가) build시 속도를 위해 cache를 해서,
# 장고에서 수정 후 다시 build할 때, cache하지 않도록
# 아래의 명령어를 바꿔가면서 (ex) testing!으로 했다가, test!!로 했다가 등등) build
RUN echo "testingg"

RUN git clone -b be --single-branch https://github.com/POPPY-MAIL/dev.git

WORKDIR /home/dev/BACKEND/

RUN pip install -r requirements.txt

RUN pip install gunicorn

RUN pip install mysqlclient

EXPOSE 8000

CMD ["bash", "-c", "python manage.py migrate --settings=BACKEND.settings.deploy && gunicorn BACKEND.wsgi --env DJANGO_SETTINGS_MODULE=BACKEND.settings.deploy --bind 0.0.0.0:8000"]
