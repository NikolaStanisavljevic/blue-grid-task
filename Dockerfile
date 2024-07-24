# Use the official Node.js LTS
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json ./
COPY package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build your TypeScript application
RUN npm run build

# Expose the port your app runs on
EXPOSE 4500

# Command to run your app
CMD ["node", "dist/index.js"]
