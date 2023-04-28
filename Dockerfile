FROM node:16
# Base image for the Dockerfile is the official Node.js version 16 image

# Maintainer of the Docker image
LABEL Maintainer="Emmanuel ADEBAYO <emmanueltolu.adebayo@gmail.com>"
 # Purpose of the Docker image
LABEL For="Uncommon API."

# Sets the working directory for the app inside the container
WORKDIR /usr/src/app
# Copies the app's package.json and package-lock.json files into the container
COPY package*.json ./

# Installs dependencies listed in package.json
RUN npm install --force

# Copies the entire app directory into the container
COPY . .

# Builds the production version of the app using 'npm run build'
RUN npm run build

# Specifies the command to run when the container starts - in this case, it runs 'npm run start:prod'
CMD ["npm", "run", "start"]