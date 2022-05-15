ARG NODE_VERSION
ARG NPM_VERSION
FROM darkfidis/node-npm:${NODE_VERSION}-${NPM_VERSION} as npm-deps
WORKDIR /usr/src/app
COPY ./package*.json ./.npmrc ./
RUN npm config set -g production false
RUN npm config set loglevel warn
RUN npm ci

FROM npm-deps as base
COPY . .
RUN npm run build
ENV NODE_ENV=production

FROM base
EXPOSE 4001
HEALTHCHECK CMD curl --fail http://localhost:4001/ping || exit 1
CMD ["node", "-r", "source-map-support/register", "dist/built/src/main"]
