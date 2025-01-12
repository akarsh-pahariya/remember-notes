import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import SignUp from './Signup';
import Header from '../components/Header';
import User from './User';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const Body = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-screen flex flex-col bg-black text-white overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<User />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Body;
