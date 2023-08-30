import { useState } from 'react';
import useAuthDispatch from '../hooks/useAuthDispatch';

const useCreateAuth = (url = '', options = null) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuthDispatch();

  const createAuth = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        logIn(json);
        localStorage.setItem('user', JSON.stringify(json));
      } else {
        setError(json);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  return { createAuth, error, isLoading };
};

export default useCreateAuth;
