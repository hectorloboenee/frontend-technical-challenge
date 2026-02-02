import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useIsLoading } from './loading.ts';
const { isLoading } = useIsLoading();
import { useStatusCode } from './status-code.ts';
const { statusCode } = useStatusCode();

export const isLoadingInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    config => {
      isLoading.value = true;
      return config;
    },
    error => {
      isLoading.value = false;
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      isLoading.value = false;
      statusCode.value = response.status;
      return response;
    },
    (error: AxiosError) => {
      isLoading.value = false;
      return Promise.reject(error);
    },
  );
};
