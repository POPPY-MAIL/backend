# base image 
FROM node 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY frontend/package.json /usr/src/app

RUN npm install
RUN npm install axios
RUN npm install react-bootstrap
RUN npm install --save sass
RUN npm install react-kakao-login
RUN npm i web-vitals --save-dev
RUN npm install react-router-dom
RUN npm i styled-components
RUN npm install react-icons --save
COPY frontend/ /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]