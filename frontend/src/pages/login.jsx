import React from 'react';
import Navbar from '../components/common/Navbar';
import LogIn from '../components/screen/LogIn';
import goToThisIfUserNotAuthenticated from '../HOC/goToThisIfUserNotAuthenticated';

const Login = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar item="login" />
      <LogIn />
    </div>
  );
};

export default Login;
