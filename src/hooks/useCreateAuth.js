import { useState } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';

const useCreateAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogIn } = useAppDispatch();

  const createAuth = async (url, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        handleLogIn(data.token, JSON.parse(options.body).username);
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
