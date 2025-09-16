#!/bin/bash

# This script will build all the relevant containers and set them running,
# then shell into the test runner, but not actually run the tests. Use it
# to debug specific tests you want to run individually etc.

# Exit immediately if there is an error
set -e
if [[ $* == *--no-mock* ]]; then
  echo "Skipping the mock"
  export DOCKER_FILES="-f docker-compose.yml -f docker-compose.local.no-mock.yml"
else
  echo "Building all services including mock"
  export DOCKER_FILES="-f docker-compose.yml -f docker-compose.local.yml"
fi

if [[ $(uname -m) == 'arm64' ]];
then
  echo "Apple Silicon detected"
  export DOCKER_BUILDKIT=1
  export LOCAL_PLATFORM=linux/amd64
else
  export DOCKER_BUILDKIT=0
fi

function build_clean {
  echo "⚙️  Running clean build (slow, full rebuild) ..."
  docker compose $DOCKER_FILES down --volumes --rmi "all"
  docker compose $DOCKER_FILES build --no-cache vcd cda laa-court-data-end-to-end-tests # It does not build mock in local
  docker compose $DOCKER_FILES up -d
}

function build_fast {
  echo "⚙️  Running fast build (cached layers, quicker) ..."
  docker compose $DOCKER_FILES up -d --build
}

function shellin {
  docker compose run --entrypoint sh laa-court-data-end-to-end-tests
}

# Choose build mode: default = clean
if [[ $* == *--fast* ]]; then
  build_fast
else
  build_clean
fi

shellin
# now run `npm run e2e-test` in container
