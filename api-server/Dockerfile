FROM --platform=linux/amd64 node:16-alpine

RUN npm i -g @nestjs/cli

# 必要なシステムライブラリをインストール
RUN apk add --no-cache \
    openssl \
    libssl1.1

WORKDIR /backend

COPY . .

# RUN npm install --non-interactive --frozen-lockfile

# RUN npm run build

# CMD ["npm", "run", "start"]