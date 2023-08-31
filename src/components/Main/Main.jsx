import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Create from '../../pages/Create/Create';
import MyAccount from '../../pages/MyAccount/MyAccount';
import NotFound from '../../pages/NotFound/NotFound';
import LogIn from '../../pages/LogIn/LogIn';
import SignUp from '../../pages/SignUp/SignUp';
import Blog from '../../pages/Blog/Blog';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
