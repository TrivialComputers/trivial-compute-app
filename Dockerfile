FROM node:18-alpine as frontend
WORKDIR /frontend
COPY app/frontend/package.json ./
RUN npm install
COPY app/frontend ./
RUN npm run build

FROM python:3.11-slim

RUN apt-get update && apt-get install -y nginx curl libpq-dev gcc && apt-get clean

WORKDIR /app
COPY app/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn

COPY app/backend/ ./backend/
COPY --from=frontend /frontend/build ./frontend/build
COPY app/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]
