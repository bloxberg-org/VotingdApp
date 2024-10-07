FROM docker.io/nginx

COPY src /usr/share/nginx/html
COPY tests tests
COPY default.conf /etc/nginx/conf.d/default.conf
