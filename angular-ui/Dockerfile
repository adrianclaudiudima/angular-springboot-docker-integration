FROM nginx
MAINTAINER Adrian Dima<adrianclaudiudima@gmail.com>

COPY dist /var/www/angular-ui
ADD  nginx/default.conf /etc/nginx/conf.d/
ADD  nginx/proxy_params /etc/nginx/conf.d/

EXPOSE 80

# Define default command.
CMD /bin/bash -c "nginx -g 'daemon off;'"
