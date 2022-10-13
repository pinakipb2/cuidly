import React from 'react';
import AboutComponenent from '../components/screen/About';
import Navbar from '../components/common/Navbar';

const About = () => {
  return (
    <>
      <Navbar item="about" />
      <AboutComponenent />
    </>
  );
};

export default About;
