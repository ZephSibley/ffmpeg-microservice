FROM node:carbon
VOLUME ["/root"]
RUN apt-get install -y ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]