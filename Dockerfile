# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Expose port 3000 for the frontend
EXPOSE 3000

# Start the application using npm start
CMD ["npm", "start"]
