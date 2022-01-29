FROM node:16 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY apps/rpc-listener-service/package.json /home/node/apps/rpc-listener-service/package.json
COPY shared/eslint-config/package.json /home/node/shared/eslint-config/package.json
COPY shared/shared-rpc-listener-service/package.json /home/node/shared/shared-rpc-listener-service/package.json
COPY package.json yarn.lock lerna.json ./

RUN yarn install --frozen-lockfile --non-interactive --production=false --ignore-scripts

COPY . .

RUN ls -la

RUN ./node_modules/.bin/lerna run build --scope @soundverse/app-rpc-listener-service
# ---

FROM node:16-alpine

RUN apk --no-cache add git

ENV NODE_ENV testflight

WORKDIR /home/node

COPY apps/rpc-listener-service/package.json /home/node/apps/rpc-listener-service/package.json
COPY shared/eslint-config/package.json /home/node/shared/eslint-config/package.json
COPY shared/shared-rpc-listener-service/package.json /home/node/shared/shared-rpc-listener-service/package.json
COPY package.json yarn.lock lerna.json ./

RUN yarn install --frozen-lockfile --non-interactive --production --ignore-scripts --no-cache

COPY --from=builder /home/node/apps/rpc-listener-service/dist/ /home/node/apps/rpc-listener-service/dist
COPY --from=builder /home/node/shared/ /home/node/shared

WORKDIR /home/node/apps/rpc-listener-service

EXPOSE 8002

CMD ["node", "dist/main.js"]