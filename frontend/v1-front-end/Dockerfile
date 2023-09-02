# Stage 1: Build
FROM node:16-buster as build
WORKDIR /app

RUN groupadd -r appuser && useradd -r -g appuser -m -d /app appuser

USER root
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
RUN npm install -g react-scripts
RUN chown -R appuser:appuser /app
RUN chown -R appuser:appuser /app/node_modules

COPY . .
RUN chown -R appuser:appuser /app

# run build as root
RUN npm run build

# switch back to appuser for running the app
USER appuser

# Stage 2: Runtime
FROM node:16-buster-slim
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]
