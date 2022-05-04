#!/bin/bash

NODE_ENV=production node dist/apps/doji-backend/main.js &
cd dist/apps/doji-frontend/
../../../node_modules/.bin/next start -p 3000 &
echo "Started Doji Backend and Frontend"
cd ../../../

nginx

wait -n

echo "Doji crash detected, exiting"

exit 1
