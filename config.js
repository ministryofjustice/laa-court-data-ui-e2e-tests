import dotenv from 'dotenv'

// Load the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'local'}`
dotenv.config({ path: envFile })

export const VCD_URL = process.env.VCD_URL
export const EMAIL = process.env.EMAIL
export const PASSWORD = process.env.PASSWORD
export const MANAGER_EMAIL = process.env.MANAGER_EMAIL
export const MANAGER_PASSWORD = process.env.MANAGER_PASSWORD
export const URN = process.env.URN
export const ASN = process.env.ASN
export const DEFENDANT_NAME = process.env.DEFENDANT_NAME
export const DEFENDANT_DOB = process.env.DEFENDANT_DOB
export const NI_NUMBER = process.env.NI_NUMBER
