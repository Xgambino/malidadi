import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const luxurySlides = [
    {
      id: 1,
      title: "Exquisite Craftsmanship",
      subtitle: "Where artistry meets perfection",
      description: "Discover our curated collection of premium timepieces, each piece meticulously crafted to embody luxury and sophistication.",
      buttonText: "Explore Collection",
      buttonAction: () => navigate('/product-catalog'),
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-black via-gray-900 to-black"
    },
    {
      id: 2,
      title: "Timeless Elegance",
      subtitle: "Luxury redefined for the discerning",
      description: "Experience the pinnacle of luxury fashion with our exclusive collection featuring the world\'s finest materials and impeccable design.",
      buttonText: "View Masterpieces",
      buttonAction: () => navigate('/product-catalog'),
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-gray-900 via-black to-gray-800"
    },
    {
      id: 3,
      title: "Heritage & Innovation",
      subtitle: "Centuries of tradition, modern excellence",
      description: "Immerse yourself in a world where traditional craftsmanship meets contemporary innovation, creating pieces that transcend time.",
      buttonText: "Discover Legacy",
      buttonAction: () => navigate('/product-catalog'),
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      bgGradient: "from-black via-gray-800 to-black"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % luxurySlides?.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [luxurySlides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentHero = luxurySlides?.[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentHero?.bgGradient} transition-all duration-1000`} />
      
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={currentHero?.image}
          alt={currentHero?.title}
          className={`w-full h-full object-cover transition-all duration-2000 ${
            isLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-4xl animate-luxury-fade">
          {/* Brand Statement */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-2 rounded-full backdrop-luxury border border-primary/30 mb-6">
              <span className="text-primary text-sm font-luxury tracking-wider">EXCLUSIVELY CURATED</span>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold mb-6 leading-tight">
            <span className="text-gradient-gold block">{currentHero?.title}</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-200 font-light leading-relaxed max-w-3xl">
            {currentHero?.subtitle}
          </p>
          
          <p className="text-base md:text-lg lg:text-xl mb-12 text-gray-300 font-light max-w-2xl leading-relaxed">
            {currentHero?.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              variant="default"
              size="lg"
              onClick={currentHero?.buttonAction}
              className="bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold px-12 py-4 rounded-full hover:shadow-luxury transition-all duration-300 hover:scale-105 text-lg"
            >
              {currentHero?.buttonText}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/product-catalog')}
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-luxury font-semibold px-12 py-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:border-primary text-lg"
            >
              View All Collections
            </Button>
          </div>

          {/* Luxury Features */}
          <div className="flex flex-wrap gap-8 mt-16 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-luxury">Handcrafted Excellence</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-luxury">Limited Edition</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-luxury">Worldwide Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {luxurySlides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-primary scale-110 shadow-luxury' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + luxurySlides?.length) % luxurySlides?.length)}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 backdrop-luxury rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 hover:shadow-luxury border border-primary/30"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => goToSlide((currentSlide + 1) % luxurySlides?.length)}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 backdrop-luxury rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110 hover:shadow-luxury border border-primary/30"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-primary">
          <span className="text-xs font-luxury tracking-wider">SCROLL</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;