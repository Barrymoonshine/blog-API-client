import { useState } from 'react';

const useFetch = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFetch = async (url, options) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setSuccess(json);
        return response;
      } else {
        setIsLoading(false);
        setError(json);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { sendFetch, success, setSuccess, error, isLoading };
};

export default useFetch;
