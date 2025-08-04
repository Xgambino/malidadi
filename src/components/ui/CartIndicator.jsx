import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const CartIndicator = ({ itemCount = 0, onClick = () => {}, className = '' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(itemCount);

  useEffect(() => {
    if (itemCount > prevCount) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative p-2 text-muted-foreground hover:text-primary transition-colors duration-200 ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <div className={`transition-transform duration-200 ${isAnimating ? 'animate-cart-bounce' : ''}`}>
        <Icon name="ShoppingCart" size={20} />
      </div>
      
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center px-1 shadow-elevation-1">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIndicator;