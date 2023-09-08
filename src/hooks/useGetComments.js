import { useState, useEffect } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppState from './useAppState';


// Rename to useBlogEffect 
const useGetComments = (url = '', options = null, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {blogs} = useAppState()

  const { saveComments } = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // Get and save selected blog
      const selectedBlog = blogs.find((item) => item._id === id);
      // Get and save likes
//

      const likes = selectedBlog.likes 

      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          // When no comments are found, Mongoose returns an empty array
          if (json.length === 0) {
            saveComments(null);
          } else {
            saveComments(json);
          }
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
    // Options is an object and it's reference should be fixed and is not needed for re-rendering, hence it's not included in the dependency array
  }, [url]);

  return { error, loading };
};

export default useGetComments;
