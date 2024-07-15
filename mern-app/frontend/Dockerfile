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

# Build the frontend
RUN echo "Starting npm run build..." \
    && npm run build \
    && echo "npm run build completed."

# Install serve to serve the build
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Start the frontend server
CMD ["serve", "-s", "build"]
