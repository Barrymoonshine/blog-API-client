import { useState, useRef, useEffect } from 'react';

const useFetch = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const objRef = useRef(options);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url, objRef);
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
  }, [url]);

  return { error, data, loading };
};

export default useFetch;
