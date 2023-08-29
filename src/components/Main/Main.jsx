import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Create from '../../pages/Create/Create';
import MyAccount from '../../pages/MyAccount/MyAccount';
import NotFound from '../../pages/NotFound/NotFound';
import LogIn from '../../pages/LogIn/LogIn';
import Register from '../../pages/Register/Register';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
