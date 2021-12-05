
FROM node:14-alpine
WORKDIR /usr/src/app/poker_analize
COPY poker_analize/package.json ./
RUN npm install
RUN npm install -g create-react-app
RUN npm i vite @vitejs/plugin-react-refresh