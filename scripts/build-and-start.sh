#!/bin/bash

./node_modules/.bin/parcel build ./src/web/index.html --out-dir ./build/static --no-cache

./node_modules/.bin/tsc ./src/server/main.ts --outDir ./build

node ./build/main.js