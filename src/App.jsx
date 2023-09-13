import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import useBlogsDispatch from './hooks/useBlogsDispatch';
import useAuthDispatch from './hooks/useAuthDispatch';
import { useEffect } from 'react';

const App = () => {
  const { getBlogs } = useBlogsDispatch();
  const { checkAuthStatus } = useAuthDispatch();

  // From any page load/refresh, getBlogs and checkAuthStatus
  useEffect(() => {
    getBlogs();
    checkAuthStatus();
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
