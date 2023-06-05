FROM node:13

RUN npm run build

# COPY dist /dist
COPY app /app
COPY package.json /
COPY package-lock.json /

RUN npm run deps:production

ENV NODE_ENV production

ENV PORT 3000
EXPOSE 3000

# Запускаем сервис при старте контейнера
CMD node app/index.js