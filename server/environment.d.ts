declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COCKROACH_CONNECTION_STRING: string;
      PORT: string;
    }
  }
}

export {};
