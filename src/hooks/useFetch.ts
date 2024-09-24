import { useState, useEffect } from 'react';

interface UseFetchProps {
  url: string;
  options?: RequestInit;
  isBaseUrl?: boolean;
}

export const useFetch = ({ url, options, isBaseUrl }: UseFetchProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const proxyUrl = import.meta.env.VITE_PROXY_URL;
  const finalURL = isBaseUrl ? `${proxyUrl}/${apiBaseUrl}${url}` : url;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(finalURL, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unkown error occurred while fetching.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
