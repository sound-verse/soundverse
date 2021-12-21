FROM node:16 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY apps/backend/package.json /home/node/apps/backend/package.json
COPY shared/eslint-config/package.json /home/node/shared/eslint-config/package.json
COPY package.json yarn.lock lerna.json ./

RUN yarn install --frozen-lockfile --non-interactive --production=false --ignore-scripts

COPY . .

RUN ls -la

RUN ./node_modules/.bin/lerna run build --scope @soundverse/app-api
# ---

FROM node:16-alpine

RUN apk --no-cache add git

ENV NODE_ENV production

WORKDIR /home/node

COPY apps/backend/package.json /home/node/apps/backend/package.json
COPY shared/eslint-config/package.json /home/node/shared/eslint-config/package.json
COPY package.json yarn.lock lerna.json ./

RUN yarn install --frozen-lockfile --non-interactive --production --ignore-scripts --no-cache

COPY --from=builder /home/node/apps/backend/dist/ /home/node/apps/backend/dist
COPY --from=builder /home/node/shared/ /home/node/shared

WORKDIR /home/node/apps/backend

EXPOSE 8001

CMD ["node", "dist/main.js"]