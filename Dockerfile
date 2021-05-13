FROM node:latest

WORKDIR ~/

COPY . ~/

RUN npm ci

EXPOSE 3001

ARG hostname
ARG username
ARG password

ENV HOST = ${hostname}
ENV USER = ${username}
ENV PASS = ${password}

CMD ["node", "./server/index.js"]