import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import MyAccount from './pages/MyAccount/MyAccount';
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
