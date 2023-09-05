import { useState } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import { saveItem } from '../helpers/localStorage';

const useCreateAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAppDispatch();

  const createAuth = async (url, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        // Save token value
        saveItem('token', data.token);
        logIn(data.token);
      } else {
        setError(data);
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
