import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CheckoutHeader = () => {
  return (
    <header className="bg-surface border-b border-border shadow-elevation-1">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="ShoppingBag" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold">ReactCommerce</span>
          </Link>

          {/* Secure Checkout Indicator */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;