import { useState, useEffect } from 'react';

const useFetchGet = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url, options);
          const json = await response.json();
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
    // Options is an object and it's reference should be fixed and not needed for re-rendering, hence it's not included in the dependency array
  }, [url]);

  return { error, data, loading };
};

export default useFetchGet;
