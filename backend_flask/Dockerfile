FROM python:3

WORKDIR /app

COPY . .

RUN pip3 install --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]

EXPOSE 10000