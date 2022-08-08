
FROM node:12-alpine

RUN apk --no-cache add --virtual builds-deps build-base python

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV PYTHONPATH=/usr/lib/python2.7/dist-packages:$PYTHONPATH

WORKDIR /home/node/app

COPY package*.json ./

EXPOSE 3000

USER node

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "start" ]