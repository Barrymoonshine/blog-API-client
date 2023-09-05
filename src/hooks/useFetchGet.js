import { useState, useEffect } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';

const useFetchGet = (url = '', options = null) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { saveComments } = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          console.log('json', json);
          saveComments(json);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };
    // Options is an object and it's reference should be fixed and not needed for re-rendering, hence it's not included in the dependency array
  }, [url]);

  return { error, loading };
};

export default useFetchGet;
