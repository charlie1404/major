FROM php:7.2-apache

RUN apt update && apt install -y nano

RUN docker-php-ext-install mysqli

COPY index.php /var/www/html/index.php
