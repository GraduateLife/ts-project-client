// NodeJS.ProcessEnv
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
      STRIPE_PRIVATE_KEY: string;
    }
  }
}

export {};
