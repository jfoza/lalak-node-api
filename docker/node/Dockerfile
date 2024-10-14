FROM node:lts AS base

WORKDIR /var/www/html

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm config set fetch-retries 5 \
    && pnpm config set registry https://registry.yarnpkg.com \
    && pnpm config set fetch-retry-mintimeout 20000 \
    && pnpm config set fetch-retry-maxtimeout 120000 \
    && pnpm install --frozen-lockfile

COPY . .

# Stage de desenvolvimento
FROM base AS development

CMD sh -c "while true; do sleep 100; done"

FROM base AS production

RUN pnpm run build

CMD sh -c "while true; do sleep 100; done"

