#!/bin/sh

node dist/apps/doji-backend/main.js &
cd dist/apps/doji-frontend/
../../../node_modules/.bin/next start &
echo "Started Doji Backend and Frontend"
cd /
