import { User } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COCKROACH_CONNECTION_STRING: string;
      PORT: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      JWT_SIGNING_KEY: string;
      REFRESH_JWT_SIGNING_KEY: string;
      JWT_EXPIRY: string;
      TWILIO_VERIFY_SID: string;
    }
  }
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
