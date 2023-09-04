import { useState } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';

const useCreateAuth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { logIn, setUsername } = useAppDispatch();

  const createAuth = async (url, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      // console.log('options', options);
      if (response.ok) {
        logIn(json);
        setUsername(options.body.username);
        localStorage.setItem('token', JSON.stringify(json));
        // localStorage.setItem('username', JSON.stringify(options.body.username));
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
