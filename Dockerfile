FROM node:20-alpine

WORKDIR /app

COPY package.json ./

#VOLUME ./node_modules

RUN npm install

# COPY . ./

CMD ["npm", "run", "dev"]

EXPOSE 8001
