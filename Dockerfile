FROM node:13

COPY bin /
COPY dist /dist
COPY package.json /
COPY package-lock.json /

RUN npm run deps:production

ENV NODE_ENV production

ENV PORT 3000
EXPOSE 3000

# Запускаем сервис при старте контейнера
CMD npm start