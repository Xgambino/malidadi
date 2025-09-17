import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import SearchBar from './SearchBar';
import CartIndicator from './CartIndicator';

const NavigationHeader = ({ currentUser: propUser = null, onSearchSubmit = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null);

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

  // ✅ Track scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Sync cart count (still in localStorage since it’s cart)
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = storedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setCartCount(totalItems);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  // ✅ Load logged-in user from sessionStorage (prop fallback)
  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    } else {
      try {
        const stored = JSON.parse(sessionStorage.getItem('currentUser'));
        if (stored) setUser(stored);
      } catch {
        setUser(null);
      }
    }
  }, [propUser]);

  // ✅ Listen for login/logout updates
  useEffect(() => {
    const handleUserUpdated = (e) => {
      if (e.detail !== undefined) {
        setUser(e.detail);
      } else {
        try {
          const stored = JSON.parse(sessionStorage.getItem('currentUser'));
          setUser(stored);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('userUpdated', handleUserUpdated);
    return () => window.removeEventListener('userUpdated', handleUserUpdated);
  }, []);

  // ✅ Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

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
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // ✅ Sign out (clear session)
  const handleSignOut = () => {
    sessionStorage.removeItem('currentUser');
    setUser(null);
    window.dispatchEvent(new CustomEvent('userUpdated', { detail: null }));
    window.location.href = '/login';
  };

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? 'backdrop-luxury shadow-luxury' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-3 group transition-all duration-300" onClick={closeMobileMenu}>
              <div className="w-[190px] h-[auto] rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img src="/assets/images/logoi.png" alt="Malidadi Logo" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary/10 shadow-md'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-luxury">{item.label}</span>
                  <div className="absolute inset-0 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar onSearch={onSearchSubmit} className="bg-surface/50 backdrop-blur-sm border-primary/20 focus-within:border-primary/40 rounded-full" />
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <CartIndicator
                itemCount={cartCount}
                onClick={() => (window.location.href = '/checkout')}
                className="hover:scale-110 transition-transform duration-300"
              />

              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-full bg-surface/20 backdrop-blur-sm border border-primary/20 hover:bg-surface/40 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="black" />
                    </div>
                    <span className="text-sm font-luxury text-foreground">
                      {user?.name || user?.email}
                    </span>
                    <Icon name={isProfileOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface/95 backdrop-blur-sm border border-primary/20 rounded-xl shadow-lg">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
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
          </div>
        </div>
      </header>
    </>
  );
};

export default NavigationHeader;
