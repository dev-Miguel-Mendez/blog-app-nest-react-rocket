FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci #$  npm ci installs exactly what’s in package-lock.json, deleting node_modules first, so you get reproducible builds that match the lockfile and fail fast if it’s out of sync. 

COPY . .

EXPOSE 8000


CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8000"]
