# Multi-stage build optimized for CI/CD with limited memory

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Optimize Node.js for 6GB CI/CD runner
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NPM_CONFIG_LOGLEVEL=error
ENV NPM_CONFIG_PROGRESS=false

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies efficiently for 6GB runner
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy source code
COPY . .

# Build the application with CI-optimized script
RUN npm run build:ci

# Production stage
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production --prefer-offline --no-audit --no-fund && \
    npm cache clean --force && \
    rm -rf ~/.npm /tmp/*

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

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