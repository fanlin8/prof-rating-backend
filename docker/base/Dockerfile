FROM node:8.11.3-alpine

LABEL author="Fan Lin<linfan0558@gmail.com>"

USER root

ENV HOME=/usr/src/
ENV SERVER=${HOME}/prof-rating-backend/

ENV BUILD_PACKAGES="git"

WORKDIR ${HOME}

# Build & Deploy
RUN apk update \
    && apk add --no-cache ${BUILD_PACKAGES} \
    && git clone https://github.com/fanlin8/prof-rating-backend.git \
    && cd ${SERVER} && rm -rf node_modules \
    && npm install && npm cache clean --force && rm -rf ~/.npm

WORKDIR ${SERVER}

EXPOSE 9090

CMD node server.js