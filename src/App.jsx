import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import useBlogsDispatch from './hooks/useBlogsDispatch';
import useAuthDispatch from './hooks/useAuthDispatch';
import useLikesDispatch from './hooks/useLikesDispatch';
import { useEffect } from 'react';

const App = () => {
  const { getBlogs } = useBlogsDispatch();
  const { checkAuthStatus } = useAuthDispatch();
  const { getLikes } = useLikesDispatch();

  // From any page load/refresh
  useEffect(() => {
    getBlogs();
    checkAuthStatus();
    getLikes();
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
