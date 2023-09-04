import { useState, useEffect } from 'react';
import { useRef } from 'react';

const useFetchGet = (url = '', options = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obj reference fixed with useRef, not needed for rendering
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

export default useFetchGet;
