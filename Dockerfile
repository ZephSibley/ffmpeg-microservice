FROM node:carbon
VOLUME ["/root"]
ADD setup-ffmpeg.sh /root
RUN /root/setup-ffmpeg.sh

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]