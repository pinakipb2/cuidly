import React from 'react';
import Navbar from '../components/common/Navbar';
import SignUp from '../components/screen/SignUp';
import goToThisIfUserNotAuthenticated from '../HOC/goToThisIfUserNotAuthenticated';

const Register = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar item="signup" />
      <SignUp />
    </div>
  );
};

export default goToThisIfUserNotAuthenticated(Register);
