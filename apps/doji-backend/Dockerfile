FROM node:14-buster-slim  AS build
# Initialize working directory
WORKDIR /build
# Set env to production
ENV NODE_ENV production
# Copy the previous build file to this image
COPY /dist/apps/doji-backend/package.json .
COPY yarn.lock .
RUN yarn --production --frozen-lockfile

FROM node:14-buster-slim  AS base
# Initialize working directory
WORKDIR /app
# Set env to production
ENV NODE_ENV production
# Copy the previous build file to this image
COPY /dist/apps/doji-backend dist
COPY /apps/doji-backend src
COPY --from=build /build/node_modules node_modules
# Expose listening port
EXPOSE 3333
# Starting scripts
CMD node dist/main.js
