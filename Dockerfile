FROM node:lts-alpine
LABEL maintainer="who <who@whooami.me>"

EXPOSE 3000

WORKDIR /mnt

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT /entrypoint.sh


