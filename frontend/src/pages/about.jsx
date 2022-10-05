import React from 'react';
import AboutComponenent from '../components/About';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar item="about" />
      <AboutComponenent />
    </>
  );
};

export default About;
