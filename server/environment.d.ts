declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_DB: string;
    }
  }
}
export {};
