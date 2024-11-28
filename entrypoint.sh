#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Default value if VITE_SERVER_URL is not set
: "${VITE_SERVER_URL:=http://localhost:8080/api/blogs}"

echo "Starting the container with VITE_SERVER_URL=${VITE_SERVER_URL}"

# Path to the built JavaScript files
BUILD_DIR=/var/www/html
PLACEHOLDER="__SERVER_URL__"

# Replace the placeholder in all JavaScript files
echo "Replacing placeholder in JavaScript files..."
find ${BUILD_DIR} -type f -name "*.js" -exec sed -i "s|${PLACEHOLDER}|${VITE_SERVER_URL}|g" {} +

echo "Placeholder replacement complete."

# Start NGINX
echo "Starting NGINX..."
nginx -g 'daemon off;'
