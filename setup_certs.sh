#!/bin/bash

# This script will set up the certificates running e2e tests against the real UAT version
# of Common Platform and recording the responses in Wiremock.

set -euo pipefail

mkdir -p wiremock/certs

printf "Fetching secrets from Kubernetes...\n"

kubectl -n laa-court-data-adaptor-uat get secret aws-secrets \
  -o "jsonpath={.data['hmcts_key']}" | \
  base64 --decode | \
  perl -0pe 's/----- /-----\n/g; s/ -----/\n-----/g' > wiremock/certs/client.key
  
kubectl -n laa-court-data-adaptor-uat get secret aws-secrets \
  -o "jsonpath={.data['hmcts_cert']}" | \
  base64 --decode | \
  perl -0pe 's/----- /-----\n/g; s/ -----/\n-----/g' > wiremock/certs/client.crt

printf "Creating PKCS12 keystore...\n"
openssl pkcs12 -export \
  -in wiremock/certs/client.crt \
  -inkey wiremock/certs/client.key \
  -out wiremock/certs/wiremock-proxy-client.p12 \
  -name cp-client \
  -passout pass:secret

printf "Done!\n"