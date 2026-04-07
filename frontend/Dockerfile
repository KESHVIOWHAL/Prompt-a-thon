# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies strictly
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Next.js binds to PORT natively
ENV PORT=3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
