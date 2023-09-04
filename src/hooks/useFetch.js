import { useState } from 'react';

const useFetch = () => {
  const [success, setSuccess] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFetch = async (url, options) => {
    setIsLoading(true);
    setIsError(null);
    setSuccess(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setSuccess(json);
        return response;
      } else {
        setIsLoading(false);
        setIsError(json);
      }
    } catch (err) {
      setIsError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { sendFetch, success, setSuccess, isError, isLoading };
};

export default useFetch;
