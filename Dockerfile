# используем образ линукс ALpine c версией node 14
FROM node:19.5.0-alpine

# указываем нашу рабочую дерикторию
WORKDIR /app

# скопировать package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# устанавливаем зависимости
RUN npm install

# копируем оставшееся приложение в контейнер
COPY . . 

# установить Prisma
RUN npm install -g prisma

# генерируем Prisma client
RUN prisma generate

# копируем Prisma schema 
COPY prisma/schema.prisma ./prisma/

# открыть порт в нашем контейнере
EXPOSE 3000

# запускаем наш сервер
CMD ["npm", "start"]