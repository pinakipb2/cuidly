import React from 'react';
import Navbar from '../components/Navbar';
import PricingComponent from '../components/Pricing';
import Footer from '../components/Footer';

const Pricing = () => {
  return (
    <>
      <Navbar item="pricing" />
      <PricingComponent />
      <Footer />
    </>
  );
};

export default Pricing;
