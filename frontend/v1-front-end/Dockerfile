# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy app code
COPY . .

# Build app
RUN npm run build

# Start app
CMD ["npm", "start"]