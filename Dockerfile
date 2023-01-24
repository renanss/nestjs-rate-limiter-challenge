# Use the official lightweight Node.js LTS image.
# https://hub.docker.com/_/node
FROM node:lts-alpine

# Expose PORT 3000
EXPOSE 3000
# Create and change to the app directory.

# Set environment variables.
ENV IP_RATE_LIMIT=100
ENV TOKEN_RATE_LIMIT=200
ENV MONGO_URI=mongodb://mongo:27017

WORKDIR /usr/src/app/

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run build

# Run the web service on container startup
CMD [ "npm", "run", "start:dev" ]