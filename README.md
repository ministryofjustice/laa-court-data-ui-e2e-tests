# laa-court-data-ui-e2e-tests

This project contains end-to-end (E2E) tests to validate the integration between:

**Court Data UI (VCD) → Court Data Adaptor (CDA) → Common Platform (CP)**

## Running the tests locally

To run the tests locally, follow these steps:

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
   - `PASSWORD`: The corresponding password.

4. Run the tests.
   Use the Playwright test runner UI:
   ```
   npx playwright test --ui
   ```

   This will open an interactive UI where you can explore and run the test suite.

   If you want to run the tests in a CI environment, use:
   ```
   npx playwright test --reporter line -j 1
   ```
   The `-j` flag ensures the tests are run in series, as the suite is not designed for different tests to run at the same time. The `--reporter` flag stops playwright from hanging while it spins up an HTTP server if there are any errors.
---
