FROM php:7.4-fpm-alpine

#Install postgres dependencies
RUN set -ex && apk --no-cache add postgresql-dev

#Install application dependencies
#RUN docker-php-ext-install mysqli pdo_mysql pdo_pgsql exif

#RUN apk add icu-dev

#RUN docker-php-ext-configure intl && docker-php-ext-install intl pcntl

#RUN apk add --no-cache freetype libpng libjpeg-turbo freetype-dev libpng-dev libjpeg-turbo-dev && \
#  docker-php-ext-configure gd --with-freetype --with-jpeg && \
#  NPROC=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
#  docker-php-ext-install -j${NPROC} gd && \
#  apk del --no-cache freetype-dev libpng-dev libjpeg-turbo-dev

#RUN apk add --update --no-cache autoconf g++ make && pecl install redis && docker-php-ext-enable redis

RUN apk add --no-cache libzip-dev zip && docker-php-ext-install zip

RUN apk --no-cache add bash openrc curl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

ENV COMPOSER_MEMORY_LIMIT=-1

RUN apk add --update nodejs nodejs-npm

RUN npm install -g yarn

# Create dev user
USER root
RUN addgroup -S dev &&\
    adduser -u 1000 -G dev -S dev

# Switch to use a non-root user from here on
USER dev

# Setup document root
RUN mkdir -p /var/www/html/blog

# Set root dir
WORKDIR /var/www/html/blog

EXPOSE 3000
