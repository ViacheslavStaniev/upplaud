# FROM ubuntu:18.04
FROM linuxserver/ffmpeg:4.2.2-cli-ls26
FROM node:16.20.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "install"]
COPY --from=0 / /
EXPOSE 5005
COPY . .
RUN mkdir -p assets/temp
RUN chmod -R 0777 assets
RUN chmod -R 0777 assets/*
CMD ["npm", "run", "server"]
