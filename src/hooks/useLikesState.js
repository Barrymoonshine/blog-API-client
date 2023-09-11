import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import useLikesDispatch from './useLikesDispatch';

const useLikesState = () => {
  const { likesState } = useContext(AppContext);

  const { getLikes } = useLikesDispatch();

  // Get Likes on page load or refresh
  useEffect(() => {
    console.log('useLikesState useEffect called');
    getLikes();
  }, []);

  return {
    likes: likesState.likes,
    likesLoading: likesState.likesLoading,
    likesError: likesState.likesError,
  };
};

export default useLikesState;
