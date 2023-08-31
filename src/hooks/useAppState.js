import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppState = () => {
  const { state } = useContext(AppContext);

  return {
    token: state.token,
    blogs: state.blogs,
  };
};

export default useAppState;
