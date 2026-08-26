#!/bin/bash

# This script will build all the relevant containers and set them running,
# then run the full test suite.

# Exit immediately if there is an error
set -e
export DOCKER_FILES="-f docker-compose.yml -f docker-compose.local.yml"

WIREMOCK_RECORD=false
for arg in "$@"; do
  case "$arg" in
    --wiremock-record)
      WIREMOCK_RECORD=true
      ;;
  esac
done

if [[ "$WIREMOCK_RECORD" == true ]]; then
  SHARED_SECRET_KEY=$(kubectl -n laa-court-data-adaptor-uat get secret aws-secrets -o jsonpath="{.data.common_platform_secret_key}" | base64 -d)
  export SHARED_SECRET_KEY
  export DOCKER_FILES="$DOCKER_FILES -f docker-compose.mtls.yml"
fi

if [[ $(uname -m) == 'arm64' ]];
then
  echo "Apple Silicon detected"
  export DOCKER_BUILDKIT=1
  export LOCAL_PLATFORM=linux/amd64
else
  export DOCKER_BUILDKIT=0
fi

function teardown {
  # stop and remove containers with all images, networks and volumes
  docker compose $DOCKER_FILES down --volumes --rmi "all"
}

function start_applications {
  docker compose $DOCKER_FILES run start_applications
}

function run_tests {
  docker compose $DOCKER_FILES up --build laa-court-data-end-to-end-tests
}

teardown
start_applications
run_tests
