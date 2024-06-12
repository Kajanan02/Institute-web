FROM node:alpine3.19 as build

# Declare variables
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_HOST

# Set environment variables
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_HOST=$REACT_APP_HOST

# Step 1: Build the app
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine3.19
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]