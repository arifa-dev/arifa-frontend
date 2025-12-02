# ───────────────────────────────
# 1) Build Stage
# ───────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Vite production bundle
RUN npm run build


# ───────────────────────────────
# 2) Production Stage
# ───────────────────────────────
FROM nginx:alpine AS production

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite files into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port used by Nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]