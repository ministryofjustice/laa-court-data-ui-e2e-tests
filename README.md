# laa-court-data-ui-e2e-tests

This project contains end-to-end (E2E) tests to validate the integration between Court Data UI (VCD) and Court Data Adaptor (CDA)

## Running the tests locally

You must have docker installed. Run the following command:

```
./run_test_local.sh
```

This will use `docker compose` to build images from the `main` branch of the VCD and CDA repos, spin up
containers based on those images, seed appropriate data, and then run the tests against them. The tests run with
the following command (defined in `package.json`):

```
npx cucumber-js
```

### Building the test environment

If you want to build the test environment and shell into the test runner but not run the tests automatically,
you can use:

```
./build_test_local.sh
```

You can pass in the `--fast` flag to avoid a full rebuild.

If you want to run the tests locally (for example, if you want to run the tests in headed mode), you can use the
following command to build the containers:

```
./build_test_local.sh --background
```

Then you can run the tests with npm in your own terminal (for example):

```
npm run e2e:headed
```

### Running against local versions of your code

Sometimes you may want to run the tests against your local versions of the VCD and CDA code. (for example, if you are 
developing a new feature and want to test it). You can do this by passing the `--dev` flag to appropriate scripts:

```
./run_test_local.sh --dev
```

Or:

```
./build_test_local.sh --dev
```

**NOTE** this assumes that you have the VCD and CDA repos checked out in the same parent directory as this repo. If you 
have them checked out elsewhere, you can set the `VCD_PATH` and `CDA_PATH` environment variables to point to the 
appropriate directories.

## Wiremock

By default, the tests will run against a Wiremock instance that is spun up in the docker compose. This returns canned
responses recorded from the UAT version of Common Platform. If you want to rerecord the responses from the live Common 
Platform environment, you must first generate a certificate and key for Wiremock to use. You can do this by running the 
following command (This assumes you are setup on the MoJ Cloud Platform):

```bash
./setup_certs.sh
```

You can then run the tests against the live Common Platform environment with the following command:

```bash
./run_test_local.sh --wiremock-record
```

This will cause Wiremock to forward requests to the live environment and record the responses for future use.

You can also add the `--wiremock-record` flag to the `./build_test_local.sh` command to build the test environment with 
Wiremock recording enabled"

```bash
./build_test_local.sh --wiremock-record
```

If you need to scrub personal data from the recorded Wiremock fixtures, run:

```bash
npm run anonymise-wiremock
```