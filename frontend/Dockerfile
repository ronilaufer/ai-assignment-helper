# Use a lightweight node image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5173
EXPOSE 5173

# Run Vite with host binding so it's accessible externally
CMD ["npm", "run", "dev", "--", "--host"]
