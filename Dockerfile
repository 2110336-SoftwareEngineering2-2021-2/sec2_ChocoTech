FROM node:14-alpine AS base
WORKDIR /build
# Prepare for installing dependencies
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json yarn.lock ./
COPY . .
# Install dependencies
RUN yarn --frozen-lockfile
# Build storybook
RUN yarn build:storybook
# Build all application
RUN yarn build

# ------ stage 2 ---------
FROM node:14-alpine AS script
WORKDIR /build
COPY package.json yarn.lock ./
# Install dependencies for production
RUN yarn --frozen-lockfile --production

# ------ stage 3 ---------
FROM ubuntu/nginx:1.18-20.04_beta
WORKDIR /etc/nginx/
ENV NODE_ENV production

# Run api update and upgrade
RUN apt update -y && apt upgrade -y

# Install curl
RUN apt -y install curl

# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
 && apt install -y nodejs

# Install musl-dev
RUN apt-get install -y musl-dev \
 && ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

# Copy application files
COPY nginx/nginx.conf .

WORKDIR /
COPY --from=base /build/package.json ./package.json
COPY --from=base /build/dist ./dist
COPY --from=base /build/apps ./apps
COPY --from=base /build/libs ./libs
COPY --from=base /build/tools ./tools
COPY --from=script /build/node_modules ./node_modules

COPY start_production.sh .
RUN chmod +x start_production.sh
RUN echo 'nginx -g "daemon off;"' >> start_production.sh

# Expose nginx port
EXPOSE 80

# # Run Start command
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["./start_production.sh"]





