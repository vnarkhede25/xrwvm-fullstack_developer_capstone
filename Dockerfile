FROM node:18 AS frontend
WORKDIR /app/frontend
COPY server/frontend/package*.json ./
RUN npm install
COPY server/frontend ./
RUN npm run build

FROM python:3.10-slim
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY server/requirements.txt .
RUN pip install -r requirements.txt
COPY server/ .
COPY --from=frontend /app/frontend/build ./frontend/build
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
