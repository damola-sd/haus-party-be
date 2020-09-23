import dotenv from "dotenv";
dotenv.config();
export const {
  MODE,
  DEV_DB_URL,
  TEST_DB_URL,
  STAGE_DB_URL,
  PROD_DB_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  VERIFICATION_SID,
  STRIPE_SECRET_KEY,
} = process.env;
