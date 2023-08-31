import { useState, useEffect } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';

const useFetchGet = (url = '') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { saveBlogs } = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url, { method: 'GET' });
          const json = await response.json();
          saveBlogs(json);
          setData(json);
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
  }, [url]);

  return { error, data, loading };
};

export default useFetchGet;
