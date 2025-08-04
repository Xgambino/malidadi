import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ cartItems = [], className = '' }) => {
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop"
    }
  ];

  const items = cartItems?.length > 0 ? cartItems : mockCartItems;
  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={`bg-surface rounded-lg border border-border p-6 shadow-elevation-1 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="ShoppingCart" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
      </div>
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
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
      {/* Pricing Breakdown */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shipping === 0 ? 'Free' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${tax?.toFixed(2)}</span>
        </div>
        {shipping === 0 && (
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
          <span className="text-lg font-bold text-primary">${total?.toFixed(2)}</span>
        </div>
      </div>
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