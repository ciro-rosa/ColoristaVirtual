import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CommunityResults from '../components/home/CommunityResults';
import ProductLines from '../components/home/ProductLines';
import CompanyStory from '../components/home/CompanyStory';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CommunityResults />
      <ProductLines />
      <CompanyStory />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;