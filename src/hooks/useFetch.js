import { useState } from 'react';

const useFetch = (url = '', options = null) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        // Do something ...?
      } else {
        setError(json);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { sendFetch, error, loading };
};

export default useFetch;
