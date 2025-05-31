# Use official Node.js LTS version as the base image
FROM node:18

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code into the working directory
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Debug: optional to check files and working directory
RUN ls -ltr
RUN pwd

# Command to run the app
CMD ["node", "index.js"]