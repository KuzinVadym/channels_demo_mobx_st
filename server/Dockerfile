FROM node:12.20.0-alpine

WORKDIR  /usr/src/main
COPY package*.json /usr/src/main/
RUN yarn install
COPY . .
RUN yarn run build

ARG PORT=3002
ENV PORT=${PORT}

EXPOSE $PORT

USER node

CMD ["node", "dist/src/index.js"]
