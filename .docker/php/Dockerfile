FROM php:7.4-fpm-alpine

#Install application dependencies
RUN apk add --no-cache libzip-dev zip bash curl && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

ENV COMPOSER_MEMORY_LIMIT=-1

RUN apk add --update nodejs npm

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
