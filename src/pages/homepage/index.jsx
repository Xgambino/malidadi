import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import CategorySection from './components/CategorySection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import Icon from '../../components/AppIcon';


const Homepage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load cart count from localStorage
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }

    // Load current user from localStorage
    const savedUser = localStorage.getItem('current-user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  const handleAddToCart = (product) => {
    try {
      // Get existing cart
      const existingCart = localStorage.getItem('shopping-cart');
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      // Check if product already exists in cart
      const existingItemIndex = cartItems?.findIndex(item => item?.id === product?.id);

      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new product to cart
        cartItems?.push({
          ...product,
          quantity: 1,
          addedAt: new Date()?.toISOString()
        });
      }

      // Save updated cart
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));

      // Update cart count
      const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
      setCartCount(totalItems);

      // Show success feedback (optional)
      console.log(`Added ${product?.name} to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSearchSubmit = (query) => {
    // Navigate to product catalog with search query
    window.location.href = `/product-catalog?search=${encodeURIComponent(query)}`;
  };

  return (
    <>
      <Helmet>
        <title>LUXURIA - Premium Luxury Collection | Exquisite Craftsmanship</title>
        <meta 
          name="description" 
          content="Discover the pinnacle of luxury with LUXURIA's curated collection of premium timepieces, jewelry, and exclusive accessories. Handcrafted excellence for the discerning connoisseur." 
        />
        <meta name="keywords" content="luxury, premium, timepieces, jewelry, exclusive, handcrafted, luxury goods, high-end, artisan, curated collection" />
        <meta property="og:title" content="LUXURIA - Premium Luxury Collection | Exquisite Craftsmanship" />
        <meta property="og:description" content="Experience the epitome of luxury with our exclusive collection of premium goods, crafted for the most discerning clientele." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luxuria.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LUXURIA - Premium Luxury Collection" />
        <meta name="twitter:description" content="Discover handcrafted luxury goods and exclusive collections for the discerning connoisseur." />
        <link rel="canonical" href="https://luxuria.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <NavigationHeader
          cartCount={cartCount}
          currentUser={currentUser}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Products Section */}
          <FeaturedProducts onAddToCart={handleAddToCart} />

          {/* Exclusive Brand Statement */}
          <section className="py-20 md:py-24 bg-gradient-to-r from-black via-gray-900 to-black">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto animate-luxury-fade">
                <div className="inline-flex items-center px-8 py-3 rounded-full backdrop-luxury border border-primary/30 mb-8">
                  <span className="text-primary text-sm font-luxury tracking-wider">HERITAGE & PRESTIGE</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-luxury font-bold text-gradient-gold mb-8">
                  Where Exclusivity Meets Excellence
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                  For over a century, LUXURIA has been the epitome of sophistication, creating extraordinary pieces that transcend time and define true luxury. Each creation is a testament to uncompromising quality and exclusive artisanship.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="backdrop-luxury rounded-2xl p-8 border border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Crown" size={28} color="black" />
                    </div>
                    <h3 className="text-xl font-luxury font-semibold text-primary mb-4">Exclusive Heritage</h3>
                    <p className="text-gray-400 font-light">Century-old traditions meet contemporary innovation</p>
                  </div>
                  
                  <div className="backdrop-luxury rounded-2xl p-8 border border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Gem" size={28} color="black" />
                    </div>
                    <h3 className="text-xl font-luxury font-semibold text-primary mb-4">Artisan Crafted</h3>
                    <p className="text-gray-400 font-light">Master artisans creating one-of-a-kind masterpieces</p>
                  </div>
                  
                  <div className="backdrop-luxury rounded-2xl p-8 border border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Shield" size={28} color="black" />
                    </div>
                    <h3 className="text-xl font-luxury font-semibold text-primary mb-4">Lifetime Excellence</h3>
                    <p className="text-gray-400 font-light">Guaranteed authenticity and lifelong service</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Section */}
          <CategorySection />

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;