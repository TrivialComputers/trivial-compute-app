FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 5555

CMD ["python", "init_db.py"]

CMD ["python", "app.py"]
