# https://github.com/moby/moby/issues/2745
FROM node:8.0.0-alpine

RUN apk add --update git

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm i

COPY . /usr/src/app
RUN npm run build

FROM nginx:1.13.0

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/*
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/conf.d/client.conf /etc/nginx/conf.d/client.conf

VOLUME /etc/nginx/conf.d/

EXPOSE 80
