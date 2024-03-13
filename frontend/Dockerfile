FROM node:16.20.0
WORKDIR /app
COPY package*.json /app
RUN ["npm", "install"]
EXPOSE 3030
COPY . .
CMD ["npm", "start"]