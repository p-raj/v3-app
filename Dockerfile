# https://github.com/moby/moby/issues/2745
FROM nginx:1.13.0

COPY build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/*
COPY config/nginx.conf /etc/nginx/conf.d/client.conf
VOLUME /etc/nginx/conf.d/

EXPOSE 80
