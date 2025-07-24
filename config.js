import dotenv from 'dotenv'

// Load the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'local'}`
dotenv.config({ path: envFile })

export const VCD_URL = process.env.VCD_URL
export const EMAIL = process.env.EMAIL
export const PASSWORD = process.env.PASSWORD
