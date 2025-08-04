import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartSummary = ({ items, className = '' }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const navigate = useNavigate();

  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const taxRate = 0.08; // 8% tax
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const promoDiscount = appliedPromo ? subtotal * appliedPromo?.discount : 0;
  const taxAmount = (subtotal - promoDiscount) * taxRate;
  const total = subtotal - promoDiscount + taxAmount + shippingCost;

  const validPromoCodes = {
    'SAVE10': { discount: 0.10, description: '10% off your order' },
    'WELCOME20': { discount: 0.20, description: '20% off for new customers' },
    'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true }
  };

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true);
    setPromoError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const promo = validPromoCodes?.[promoCode?.toUpperCase()];
    if (promo) {
      setAppliedPromo({ ...promo, code: promoCode?.toUpperCase() });
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try SAVE10, WELCOME20, or FREESHIP');
    }
    
    setIsApplyingPromo(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={`bg-surface border border-border rounded-lg p-6 space-y-6 ${className}`}>
      <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
      {/* Promo Code Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Promo Code</h3>
        
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-success" />
              <div>
                <p className="text-sm font-medium text-success">{appliedPromo?.code}</p>
                <p className="text-xs text-success/80">{appliedPromo?.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={14}
              onClick={handleRemovePromo}
              className="text-success hover:text-success hover:bg-success/10"
            />
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value)}
              error={promoError}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleApplyPromo}
              disabled={!promoCode?.trim() || isApplyingPromo}
              loading={isApplyingPromo}
              className="px-4"
            >
              Apply
            </Button>
          </div>
        )}
      </div>
      {/* Order Breakdown */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({items?.length} items)</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        
        {appliedPromo && appliedPromo?.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Discount ({appliedPromo?.code})</span>
            <span className="text-success">-${promoDiscount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${taxAmount?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-muted-foreground">Shipping</span>
            {subtotal > 50 && (
              <Icon name="Info" size={14} className="text-muted-foreground" />
            )}
          </div>
          <span className="text-foreground">
            {(appliedPromo?.freeShipping || subtotal > 50) ? 'FREE' : `$${shippingCost?.toFixed(2)}`}
          </span>
        </div>
        
        {subtotal > 50 && (
          <p className="text-xs text-success">🎉 You qualify for free shipping!</p>
        )}
      </div>
      {/* Total */}
      <div className="pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary">${total?.toFixed(2)}</span>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        iconName="CreditCard"
        iconPosition="left"
        onClick={handleCheckout}
        className="mt-6"
      >
        Proceed to Checkout
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-2">
        <Icon name="Shield" size={14} />
        <span>Secure checkout with SSL encryption</span>
      </div>
    </div>
  );
};

export default CartSummary;