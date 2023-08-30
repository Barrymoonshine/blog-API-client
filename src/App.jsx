import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';
import useAuthDispatch from './hooks/useAuthDispatch';

const App = () => {
  const { logIn } = useAuthDispatch();

  useEffect(() => {
    // Check for an existing user in local storage on page load
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      console.log('existing user in local storage', user);
      logIn(user);
    }
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
