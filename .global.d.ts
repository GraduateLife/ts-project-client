// NodeJS.ProcessEnv
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
