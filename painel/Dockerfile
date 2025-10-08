# Build stage: build the Next.js app
FROM node:18-alpine AS build

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN rm -rf .next && \
    npm run build

# Production stage: run the Next.js app
FROM node:18-alpine

WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy build artifacts
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]


