# laa-court-data-ui-e2e-tests

This project contains end-to-end (E2E) tests to validate the integration between:

**Court Data UI (VCD) → Court Data Adaptor (CDA) → Common Platform Mock (Mock)**

## Running the tests locally

You must have docker installed. Run the following command:

```
./run_test_local.sh
```

This will use `docker compose` to build images from the `main` branch of the VCD, CDA and Mock repos, spin up
containers based on those images, seed appropriate data, and then run the tests against them. The tests run with
the following command (defined in `package.json`):

```
npx playwright test --reporter line -j 1
```
The `-j` flag ensures the tests are run in series, as the suite is not designed for different tests to run at the same time. The `--reporter` flag stops playwright from hanging while it spins up an HTTP server if there are any errors.

If you want to build the test environment and shell into the test runner but not run the tests automatically,
you can use:

```
./build_test_local.sh
```

You can pass in the `--fast` flag to avoid a full rebuild, and the `--no-mock` flag to have CDA point to your own
copy of the mock, expected to be running on localhost:3000, instead of the dockerised mock

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
   - `URN`: The URN of a case with 4 defendants
   - `ASN`: The ASN of a defendant who appears in 2 cases with a total of 7 defendants
   - `DEFENDANT_NAME`: The full name of the above defendant
   - `DEFENDANT_DOB`: The date of birth of the above defendant
   - `NI_NUMBER`: The national insurance number of the above defendant

  Note that if you want to run the tests against the dockerised version of VCD you can point `VCD_URL` at `localhost:3001` (you will also need to ensure your local env vars mirror those in the docker-compose)

4. Run the tests.
   Use the Playwright test runner UI:
   ```
   npx playwright test --ui
   ```

   This will open an interactive UI where you can explore and run the test suite.
---
