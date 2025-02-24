import { ref } from 'vue';
import type { ApiError } from '@/services/api';

export function useAsyncState<T>(defaultValue: T) {
  const data = ref<T>(defaultValue);
  const error = ref<ApiError | null>(null);
  const loading = ref(false);

  async function execute<R>(
    asyncFunction: () => Promise<R>,
    options: {
      onSuccess?: (result: R) => void;
      onError?: (error: ApiError) => void;
    } = {}
  ) {
    try {
      loading.value = true;
      error.value = null;
      const result = await asyncFunction();
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (e) {
      const apiError = e as ApiError;
      error.value = apiError;
      
      if (options.onError) {
        options.onError(apiError);
      }
      
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    error,
    loading,
    execute
  };
} 