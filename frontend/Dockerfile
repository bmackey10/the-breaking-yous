# Use an existing Node.js image as base
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy Tailwind CSS configuration files
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY public ./public
COPY src ./src

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

