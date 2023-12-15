# Stage 1: Build
FROM node:16-buster as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install

# Install react-scripts globally
RUN npm install -g react-scripts

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:16-buster-slim
WORKDIR /app

# Set Node.js to production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096

# Install 'serve' for static file serving
RUN npm install -g serve

# Copy build directory from build stage
COPY --from=build /app/build ./build

# Expose the port that your application will run on
EXPOSE 3000

# Start the static file server, listening on port 8080
CMD ["serve", "-s", "build", "-l", "3000"]
