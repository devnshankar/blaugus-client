#!/bin/sh

set -e

: "${VITE_SERVER_URL:=http://localhost:8080/api/blogs}"

echo "Starting the container with VITE_SERVER_URL=${VITE_SERVER_URL}"

BUILD_DIR=/var/www/html
PLACEHOLDER="__VITE_SERVER_URL__"

echo "Searching for placeholder in JavaScript files..."
FILES=$(find ${BUILD_DIR} -type f -name "*.js" -print)

if [ -z "$FILES" ]; then
  echo "No JavaScript files found in ${BUILD_DIR}."
  exit 1
fi

for file in $FILES; do
  if grep -q "${PLACEHOLDER}" "$file"; then
    echo "Replacing placeholder in $file"
    sed -i "s|${PLACEHOLDER}|${VITE_SERVER_URL}|g" "$file"
  else
    echo "No placeholder found in $file"
  fi
done

echo "Placeholder replacement complete."

echo "Starting NGINX..."
nginx -g 'daemon off;'
