import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems = [], className = '', onClearCart }) => {
  const items = cartItems;
  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0) || 0;
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 9.99 : 0);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 shadow-elevation-1 ${className}`}>
      {/* Header with Clear Cart */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="ShoppingCart" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
        </div>
        <button
          onClick={onClearCart}
          disabled={items.length === 0}
          className={`text-sm transition-colors duration-200 ${
            items.length === 0
              ? 'text-muted-foreground cursor-not-allowed'
              : 'text-destructive hover:text-destructive/80'
          }`}
        >
          Clear Cart
        </button>
      </div>

      {/* Cart Items */}
      {items?.length > 0 ? (
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item?.id} className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">{item?.name}</h3>
                <p className="text-sm text-muted-foreground">Qty: {item?.quantity}</p>
              </div>
              <div className="text-sm font-medium text-foreground">
                ${(item?.price * item?.quantity)?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-6">Your cart is empty.</p>
      )}

      {/* Pricing Breakdown */}
      {items?.length > 0 && (
        <>
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? (subtotal > 0 ? 'Free' : '$0.00') : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">${tax.toFixed(2)}</span>
            </div>
            {shipping === 0 && subtotal > 100 && (
              <div className="flex items-center space-x-2 text-xs text-success">
                <Icon name="CheckCircle" size={14} />
                <span>Free shipping on orders over $100</span>
              </div>
            )}
          </div>
          {/* Total */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}

      {/* Promo Code Section */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="Tag" size={16} />
          <span>Add promo code</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
