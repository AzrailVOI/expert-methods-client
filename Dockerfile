FROM node

WORKDIR /app
COPY . /app

EXPOSE 5173

RUN npm install -g pnpm
RUN npm install -g live-server
RUN pnpm i
CMD ["pnpm", "dev"]