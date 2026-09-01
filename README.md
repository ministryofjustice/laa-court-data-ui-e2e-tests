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
The `-j` flag ensures the tests are run in series, as the suite is not designed for different tests to run at the same time. The `--reporter` flag stops playwright from hanging while it spins up an HTTP server if there are any errors.

If you want to build the test environment and shell into the test runner but not run the tests automatically,
you can use:

```
./build_test_local.sh
```

You can pass in the `--fast` flag to avoid a full rebuild.

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

## Running the tests outside docker

To run the tests outside docker, follow these steps:

1. Install Node.js.
   Check the required version in the `.tool-versions` file and install it using a version manager like `asdf` or `nvm`.

2. Install Playwright and dependencies.
   Run the following commands:
   ```
   npm install
   npx playwright install
   ```

3. Set up environment variables.
   Copy the example environment file and configure your credentials:
   ```
   cp .env.example .env.local
   ```
   Then edit `.env.local` and set the following variables:
   - `VCD_URL`: The base URL of the Court Data UI application.
   - `EMAIL`: The user email for authentication.
   - `APPEAL_URN`: The URN of an appeal case
   - `BREACH_URN`: The URN of a breach case
   - `URN_WITH_MULTIPLE_HEARINGS`: The URN of a case with multiple hearings
   - `POCA_URN`: The URN of a POCA case

  Note that if you want to run the tests against the dockerised version of VCD you can point `VCD_URL` at `localhost:3001` (you will also need to ensure your local env vars mirror those in the docker-compose)

4. Run the tests.
   Use the Cucumber test runner UI:
   ```
   npx cucumber-js
   ```

   This will open an interactive UI where you can explore and run the test suite.
---
