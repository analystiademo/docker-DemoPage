# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . /usr/src/app

# Expose port 4000 (since your Node.js app runs on 4000)
EXPOSE 4000

# Run the app
CMD [ "npm", "start" ]
