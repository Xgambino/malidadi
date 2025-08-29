import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import NavigationHeader from "../../components/ui/NavigationHeader";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import Icon from "../../components/AppIcon";

const Homepage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const videoRef = useRef(null);

  // Load cart and user from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    const savedUser = localStorage.getItem("current-user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error loading user:", error);
      }
    }
  }, []);

  // Scroll-based video opacity only
  useEffect(() => {
  if (!videoRef.current) return;
  const video = videoRef.current;

  video.style.opacity = 0;

  const handleScroll = () => {
    const section = video.closest("section");
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate distance from section center to viewport center
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;

    const distance = Math.abs(viewportCenter - sectionCenter);
    const maxDistance = windowHeight / 2 + rect.height / 2;

    // Map distance to opacity: middle = 1, edges = 0
    const opacity = Math.max(0, 1 - distance / maxDistance);

    video.style.opacity = opacity;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const handleAddToCart = (product) => {
    try {
      const existingCart = localStorage.getItem("shopping-cart");
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      const existingIndex = cartItems?.findIndex(item => item?.id === product?.id);
      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += 1;
      } else {
        cartItems.push({ ...product, quantity: 1, addedAt: new Date().toISOString() });
      }

      localStorage.setItem("shopping-cart", JSON.stringify(cartItems));
      const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleSearchSubmit = (query) => {
    window.location.href = `/product-catalog?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Helmet>
        <title>Malidadi - Premium Luxury Collection | Exquisite Craftsmanship</title>
        <meta
          name="description"
          content="Discover the pinnacle of luxury with Malidadi's curated collection of premium timepieces, jewelry, and exclusive accessories. Handcrafted excellence for the discerning connoisseur."
        />
        <meta
          name="keywords"
          content="luxury, premium, timepieces, jewelry, exclusive, handcrafted, luxury goods, high-end, artisan, curated collection"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <NavigationHeader
          cartCount={cartCount}
          currentUser={currentUser}
          onSearchSubmit={handleSearchSubmit}
        />

        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Products */}
          <FeaturedProducts onAddToCart={handleAddToCart} />

          {/* Exclusive Brand Statement Section */}
          <section className="relative py-20 md:py-24 bg-black">
            {/* Background Video (muted) */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/images/video-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
            >
              <source src="/assets/videos/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Foreground Content */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto animate-luxury-fade">
                {/* Tagline */}
                <div className="inline-flex items-center px-8 py-3 rounded-full backdrop-luxury border border-primary/30 mb-8">
                  <span className="text-primary text-sm font-luxury tracking-wider">
                    HERITAGE & PRESTIGE
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-luxury font-bold text-gradient-gold mb-8">
                  Where Exclusivity Meets Excellence
                </h2>

                {/* Description */}
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                  For over the years, Malidadi has been the epitome of sophistication, creating extraordinary pieces that transcend time and define true luxury. Each creation is a testament to uncompromising quality and exclusive artisanship.
                </p>

                {/* Glassy Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {[
                    { icon: "Crown", title: "Exclusive Heritage", text: "Century-old traditions meet contemporary innovation" },
                    { icon: "Gem", title: "Artisan Crafted", text: "Master artisans creating one-of-a-kind masterpieces" },
                    { icon: "Shield", title: "Lifetime Excellence", text: "Guaranteed authenticity and lifelong service" },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-8 border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg hover:scale-105 hover:border-primary/40 transition-transform duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name={card.icon} size={28} color="black" />
                      </div>
                      <h3 className="text-xl font-luxury font-semibold text-primary mb-4">{card.title}</h3>
                      <p className="text-gray-200 font-light">{card.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Category Section */}
          <CategorySection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;
