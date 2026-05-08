import dotenv from 'dotenv';

const envName = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${envName}` });

const isCi = process.env.CI === 'true';
const retryCount = isCi ? Number(process.env.CUCUMBER_RETRY || 0) : 0;

export default {
    import: [
        'features/support/**/*.js',
        'features/step_definitions/**/*.js'
    ],
    format: [
        'progress-bar',
        ['html', 'reports/cucumber.html'],
        ['json', 'reports/cucumber.json'],
        ['junit', 'reports/cucumber.junit.xml']
    ],
    formatOptions: {
        snippetInterface: 'async-await',
        html: {
            externalAttachments: ['image/*']
        }
    },
    retry: retryCount,
    ...(retryCount > 0 ? { retryTagFilter: '@flaky' } : {}),
    worldParameters: {
        envName,
        headless: process.env.HEADLESS !== 'false',
        browser: process.env.BROWSER || 'chromium',
        baseUrl: process.env.VCD_URL,
        devUrl: process.env.VCD_DEV_URL,
        uatUrl: process.env.VCD_UAT_URL,
        authStorageState: 'data/auth/user.json',
        defaultEmail: process.env.EMAIL,
        managerEmail: process.env.MANAGER_EMAIL,
        adminEmail: process.env.ADMIN_EMAIL,
        testData: {
            urn: process.env.URN,
            asn: process.env.ASN,
            defendantName: process.env.DEFENDANT_NAME,
            defendantDob: process.env.DEFENDANT_DOB,
            niNumber: process.env.NI_NUMBER
        }
    }
};
