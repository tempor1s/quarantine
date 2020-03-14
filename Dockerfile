FROM node:alpine 

WORKDIR /usr/src/app 

COPY package.json ./ 

RUN npm install 
RUN npm install -g pm2 

COPY . ./ 

RUN npm run build 

COPY . ./

CMD [ "pm2-runtime", "dist/index.js" ]
