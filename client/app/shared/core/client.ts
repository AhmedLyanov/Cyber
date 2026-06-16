export const useApi = () => {
  const config = useRuntimeConfig();
  const authToken = useCookie<string>('auth_token');

  return $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {

      let token = authToken.value;
      if (process.client && !token) {
        token = localStorage.getItem('token') || undefined;
        if (token) {
          authToken.value = token;
        }
      }

      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
      }
    },
  });
};

export const handleApiResponse = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    const result = await promise;
    return result;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error(error.data?.message || error.message || 'API request failed');
  }
};