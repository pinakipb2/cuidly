import React from 'react';
import Navbar from '../components/Navbar';
import LogIn from '../components/LogIn';

const Login = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar item="login" />
      <LogIn />
    </div>
  );
};

export default Login;
