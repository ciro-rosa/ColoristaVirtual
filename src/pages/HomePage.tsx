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
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CommunityResults />
      <CompanyStory />
      <ProductLines />
      <Testimonials />
      <CallToAction />
    </main>
  );
};

export default HomePage;