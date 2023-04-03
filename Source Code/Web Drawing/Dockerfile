FROM node:19-alpine AS development
ENV NODE_ENV development
WORKDIR /web
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]