const dotenv = require('dotenv')

// Load the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'local'}`
dotenv.config({ path: envFile })

const VCD_URL = process.env.VCD_URL
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD
const MANAGER_EMAIL = process.env.MANAGER_EMAIL
const MANAGER_PASSWORD = process.env.MANAGER_PASSWORD
const URN = process.env.URN
const ASN = process.env.ASN
const DEFENDANT_NAME = process.env.DEFENDANT_NAME
const DEFENDANT_DOB = process.env.DEFENDANT_DOB

module.exports = { VCD_URL, EMAIL, PASSWORD, MANAGER_EMAIL, MANAGER_PASSWORD, URN, ASN, DEFENDANT_NAME, DEFENDANT_DOB }
