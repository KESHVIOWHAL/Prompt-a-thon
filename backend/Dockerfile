# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and Prisma schema
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port 5000 (Cloud Run uses PORT environment variable, usually defaults to 8080)
# We will use exactly what Cloud Run passes.
ENV PORT=5000
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
