FROM node:14-buster-slim AS base
WORKDIR /build

# Prepare for installing dependencies
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./dist/apps/doji-frontend .
COPY yarn.lock .
RUN yarn --frozen-lockfile --production

FROM node:14-buster-slim AS production
ENV NODE_ENV production
WORKDIR /app
# Copy only necessary file for running app
COPY --from=base /build/package.json ./package.json
COPY --from=base /build/node_modules ./node_modules
COPY --from=base /build/.next ./.next
COPY --from=base /build/public ./public
# Expose listening port
EXPOSE 3000
# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node
# Staring script
CMD yarn start
