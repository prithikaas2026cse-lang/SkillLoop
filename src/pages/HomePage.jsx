import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ReverseMatchingExplainer } from '../components/home/ReverseMatchingExplainer';
import { HowItWorks } from '../components/home/HowItWorks';
import { FeaturedSkills } from '../components/home/FeaturedSkills';
import { PeerTestimonials } from '../components/home/PeerTestimonials';
import { CTASection } from '../components/home/CTASection';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ReverseMatchingExplainer />
      <HowItWorks />
      <FeaturedSkills />
      <PeerTestimonials />
      <CTASection />
    </div>
  );
};
