FROM python:3.8
RUN apt update -y && apt install -y python3-pip python-dev
RUN pip install flask flask_mysqldb flask_cors
WORKDIR /app
COPY . .
EXPOSE 5000
CMD [ "python3", "app.py" ]
