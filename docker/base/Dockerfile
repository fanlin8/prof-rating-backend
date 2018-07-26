FROM node:8.11-jessie

LABEL author="Fan Lin<linfan0558@gmail.com>"

USER root

ENV HOME=/usr/src/
ENV SERVER=${HOME}/prof-rating-backend/

WORKDIR ${HOME}

# Set proxy server
# ENV http_proxy http://156.132.20.149:80
# ENV https_proxy http://156.132.20.149:80

# RUN npm config set strict-ssl false \
#     && npm config set registry "http://registry.npmjs.org/" \
#     && npm config set registry "http://registry.npmjs.org/" \
#     && npm config set proxy http://156.132.20.149:80 \
#     && npm config set https-proxy http://156.132.20.149:80 \
#     && export HTTP_PROXY=http://156.132.20.149:80 \
    # GIT pull
    # && git config --global http.sslVerify false \
RUN git clone https://github.com/fanlin8/prof-rating-backend.git

# RUN git -C nextgen/ checkout feature/ATeam

WORKDIR ${SERVER}

# Build & Deploy
RUN rm -rf node_modules \
    && npm install && npm cache clean --force && rm -rf ~/.npm

EXPOSE 9090

CMD ["node", "server.js"]