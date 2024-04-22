FROM node

WORKDIR /app

COPY dist /app

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
