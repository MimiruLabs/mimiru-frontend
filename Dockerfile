# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["npm", "start"]