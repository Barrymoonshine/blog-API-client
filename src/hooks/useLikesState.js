import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useLikesState = () => {
  const { likesState } = useContext(AppContext);

  return {
    likes: likesState.likes,
    likesLoading: likesState.likesLoading,
    likesError: likesState.likesError,
  };
};

export default useLikesState;
