FROM node:16-alpine

WORKDIR /api

ARG ENV="dev"
ENV NODE_ENV=${ENV}

COPY package*.json .
COPY ./Makefile .
COPY ./tsconfig.json .
COPY ./src ./src/
COPY ./credential ./credential/

RUN apk add --no-cache make
RUN yarn add typescript
RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]