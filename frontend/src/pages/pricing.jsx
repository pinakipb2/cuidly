import React from 'react';
import Navbar from '../components/common/Navbar';
import PricingComponent from '../components/screen/Pricing';
import Footer from '../components/common/Footer';

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
