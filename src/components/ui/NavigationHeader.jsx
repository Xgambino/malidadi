import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import SearchBar from './SearchBar';
import CartIndicator from './CartIndicator';

const NavigationHeader = ({ cartCount = 0, currentUser = null, onSearchSubmit = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Collection', path: '/product-catalog', icon: 'Package' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCart' }
  ];

  const isActiveRoute = (path) => {
    if (path === '/homepage') {
      return location.pathname === '/' || location.pathname === '/homepage';
    }
    if (path === '/product-catalog') {
      return location.pathname === '/product-catalog' || location.pathname === '/product-detail';
    }
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-luxury shadow-luxury' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Malidadi Logo */}
            <Link 
              to="/homepage" 
              className="flex items-center space-x-3 group transition-all duration-300"
              onClick={closeMobileMenu}
            >
              <div className="w-[190px] h-[auto] rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
  <img 
    src="/assets/images/logoi.png" 
    alt="Malidadi Logo" 
    className="w-full h-full object-contain"
  />
</div>

            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {menuItems?.slice(0, 2)?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10 shadow-md' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-luxury">{item?.label}</span>
                  <div className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <SearchBar onSearch={onSearchSubmit} className="bg-surface/50 backdrop-blur-sm border-primary/20 focus-within:border-primary/40 rounded-full" />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <CartIndicator 
                  itemCount={cartCount} 
                  onClick={() => window.location.href = '/shopping-cart'}
                  className="hover:scale-110 transition-transform duration-300"
                />
              </div>
              {currentUser ? (
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-surface/20 backdrop-blur-sm border border-primary/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="black" />
                  </div>
                  <span className="text-sm font-luxury text-foreground">Welcome, {currentUser?.name}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold rounded-full hover:shadow-luxury transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-2 text-foreground hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-full"
                aria-label="Search"
              >
                <Icon name="Search" size={20} />
              </button>
              
              <CartIndicator 
                itemCount={cartCount} 
                onClick={() => window.location.href = '/shopping-cart'} 
                className="hover:scale-110 transition-transform duration-300"
              />

              <button
                onClick={toggleMobileMenu}
                className="p-2 text-foreground hover:text-primary transition-colors duration-300 hover:bg-primary/10 rounded-full"
                aria-label="Menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-luxury border-t border-primary/20 z-40">
            <div className="container mx-auto px-4 py-6">
              <SearchBar 
                onSearch={(query) => {
                  onSearchSubmit(query);
                  setIsSearchOpen(false);
                }} 
                autoFocus
                className="bg-surface/30 backdrop-blur-sm border-primary/30 focus-within:border-primary/50 rounded-full"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="fixed top-20 right-0 bottom-0 w-80 backdrop-luxury border-l border-primary/20 overflow-y-auto">
            <nav className="p-6 space-y-4">
              {menuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-luxury font-medium transition-all duration-300 ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10 shadow-md border border-primary/20' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item?.icon} size={22} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-primary/20 pt-6 mt-6">
                {currentUser ? (
                  <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-surface/20 border border-primary/20">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="black" />
                    </div>
                    <span className="text-sm font-luxury text-foreground">Welcome, {currentUser?.name}</span>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold transition-all duration-300 hover:shadow-luxury"
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationHeader;