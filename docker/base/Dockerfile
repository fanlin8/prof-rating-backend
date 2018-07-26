FROM node:8.11.3-slim

LABEL author="Fan Lin<linfan0558@gmail.com>"

USER root

ENV HOME=/usr/src/
ENV SERVER=${HOME}/prof-rating-backend/

ENV BUILD_PACKAGES="git"

WORKDIR ${HOME}

# Build & Deploy
RUN apt-get update -y \
    && apt-get install --no-install-recommends -y -q ${BUILD_PACKAGES} \
    && git clone https://github.com/fanlin8/prof-rating-backend.git \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && apt-get remove --purge -y ${BUILD_PACKAGES} && apt-get autoremove -y \
    && cd ${SERVER} && rm -rf node_modules \
    && npm install && npm cache clean --force && rm -rf ~/.npm

EXPOSE 9090

CMD ["node", "prof-rating-backend/server.js"]