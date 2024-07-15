# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Add echo statements for better logging
RUN echo "Starting npm install..." \
    && npm cache clean --force \
    && npm install --verbose || npm install --verbose \
    && echo "Npm install completed."

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
