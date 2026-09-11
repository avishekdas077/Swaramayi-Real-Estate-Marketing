import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, ShieldCheck, Award, MapPin } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    title: 'Find Your Dream Property in Kolkata',
    subtitle: 'Your Dream Property. Our Trusted Guidance.',
    btnPrimary: 'Explore Properties',
    btnPrimaryLink: '/properties',
    btnSecondary: 'Contact Us',
    btnSecondaryLink: '/contact',
    tag: 'Kolkata Real Estate Leader',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Homes. Prime Locations.',
    subtitle: 'Discover carefully selected residential apartments, sky villas & bungalows across Kolkata.',
    btnPrimary: 'Explore Residential',
    btnPrimaryLink: '/properties?category=Buy',
    btnSecondary: 'View Projects',
    btnSecondaryLink: '/projects',
    tag: 'Verified Luxury Residences',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
    title: 'Invest in Kolkata\'s Growing Future',
    subtitle: 'Buy, Sell, Rent & Invest with complete transparency and local market insights.',
    btnPrimary: 'Explore Projects',
    btnPrimaryLink: '/projects',
    btnSecondary: 'Investment Guide',
    btnSecondaryLink: '/files',
    tag: 'New Town & Rajarhat Hub',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    title: 'Smart Commercial Real Estate',
    subtitle: 'Find high-yield commercial office spaces, retail shops & showrooms tailored for growth.',
    btnPrimary: 'Explore Commercial',
    btnPrimaryLink: '/properties?category=Commercial',
    btnSecondary: 'Consult Advisor',
    btnSecondaryLink: '/contact',
    tag: 'Commercial & Retail Spaces',
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80',
    title: 'Your Next Address Starts Here',
    subtitle: 'Professional real estate marketing guidance from property search to legal possession.',
    btnPrimary: 'Find Property',
    btnPrimaryLink: '/properties',
    btnSecondary: 'Our Services',
    btnSecondaryLink: '/services',
    tag: 'Trusted Kolkata Guidance',
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-navy-900 overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Dark Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/40" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl text-left space-y-5 animate-fadeIn">
                {/* Tag */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gold-500/20 border border-gold-500/40 rounded-full text-gold-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>{slide.tag}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl text-gray-200 font-medium max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.btnPrimaryLink}
                    className="px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-extrabold text-sm sm:text-base rounded-xl shadow-gold transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-0.5"
                  >
                    <span>{slide.btnPrimary}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to={slide.btnSecondaryLink}
                    className="px-6 py-3.5 bg-navy-900/80 hover:bg-navy-800 text-white border border-gold-500/40 font-semibold text-sm sm:text-base rounded-xl backdrop-blur-md transition-all duration-300"
                  >
                    {slide.btnSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
