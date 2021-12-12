FROM node:16

# create app directory
WORKDIR /usr/src/app

# install dependencies by copying Node package 
# files to work directory and running npm install
COPY package*.json ./
RUN npm install

# copy all application source to the application directory
COPY . .

# tell docker what port the app runs on
EXPOSE 3000

# define command to run application
CMD [ "node", "index.js" ]