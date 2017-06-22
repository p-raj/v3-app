# https://github.com/moby/moby/issues/2745
FROM nginx:1.13.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY config/nginx.conf /etc/nginx/conf.d/client.conf
COPY build /usr/share/nginx/html

EXPOSE 80
