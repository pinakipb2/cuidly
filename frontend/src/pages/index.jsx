import React, { useEffect } from 'react';
import { requestGuest } from '../api/auth';
import ExtendedHero from '../components/screen/ExtendedHero';
import Footer from '../components/common/Footer';
import HeroSection from '../components/screen/HeroSection';
import Navbar from '../components/common/Navbar';
import ShortenHero from '../components/screen/ShortenHero';
import goToThisIfUserNotAuthenticated from '../HOC/goToThisIfUserNotAuthenticated';

const Home = () => {
  useEffect(() => {
    const controller = new AbortController();
    const getGuestSession = async () => {
      try {
        const guestSession = await requestGuest({ signal: controller.signal });
        console.log(guestSession);
      } catch (err) {
        console.log(err);
      }
    };
    getGuestSession();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <ShortenHero />
      <ExtendedHero />
      <Footer />
    </div>
  );
};

export default Home;
