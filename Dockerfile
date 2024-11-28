# Use a Node.js image
FROM node:alpine

# Install necessary dependencies, including NGINX and bash
RUN apk add --no-cache nginx bash

# Set the working directory
WORKDIR /app

# Copy project files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the production-ready React app
RUN npm run build

# Create the NGINX default directory and copy build files
RUN mkdir -p /var/www/html && cp -r dist/* /var/www/html/

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the startup script into the image
COPY entrypoint.sh /entrypoint.sh

# Make the startup script executable
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Set the entrypoint to the startup script
ENTRYPOINT ["/entrypoint.sh"]
