FROM docker.io/nginx

COPY src /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
