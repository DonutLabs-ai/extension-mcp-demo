import { RequestConfig } from "umi";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (config) => {
      console.log('3', config);
      console.log('3');
      return config;
    },
    async (config) => {
      console.log('2 delay', config);
      await delay(3000);
      console.log('2 delay');
      return config;
    },
    (config) => {
      console.log('1', config);
      console.log('1');
      return config;
    },
  ],
  responseInterceptors: [],
};

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' }
}
