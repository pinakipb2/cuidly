import React from 'react';
import Navbar from '../components/Navbar';
import SignUp from '../components/SignUp';

const Register = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar item="signup" />
      <SignUp />
    </div>
  );
};

export default Register;
