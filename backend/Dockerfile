# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY src ./src

# Generate Prisma client and build NestJS app
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy only the production node_modules
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built assets and Prisma client
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/generated ./generated

EXPOSE 3001

CMD ["node", "dist/main.js"]
