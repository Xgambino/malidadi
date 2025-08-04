import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const OrderReview = ({ onBack, onPlaceOrder, formData, isVisible = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToNewsletter, setAgreedToNewsletter] = useState(false);

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsLoading(false);
      onPlaceOrder();
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CheckCircle" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Review Your Order</h2>
      </div>
      {/* Shipping Information Review */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Truck" size={16} />
          <span>Shipping Address</span>
        </h3>
        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="font-medium text-foreground">
            {formData?.firstName} {formData?.lastName}
          </p>
          <p className="text-muted-foreground">{formData?.email}</p>
          <p className="text-muted-foreground mt-2">
            {formData?.address}<br />
            {formData?.city}, {formData?.state} {formData?.zipCode}<br />
            {formData?.country}
          </p>
        </div>
      </div>
      {/* Payment Information Review */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="CreditCard" size={16} />
          <span>Payment Method</span>
        </h3>
        <div className="bg-muted p-4 rounded-lg text-sm">
          {formData?.cardNumber ? (
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">
                  **** **** **** {formData?.cardNumber?.slice(-4)}
                </p>
                <p className="text-muted-foreground">{formData?.cardName}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Icon name="Wallet" size={20} className="text-muted-foreground" />
              <p className="font-medium text-foreground">Alternative Payment Method</p>
            </div>
          )}
        </div>
      </div>
      {/* Estimated Delivery */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Estimated Delivery</span>
        </h3>
        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="text-foreground font-medium">Standard Shipping</p>
          <p className="text-muted-foreground">
            Estimated delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4 mb-6">
        <Checkbox
          label="I agree to the Terms and Conditions and Privacy Policy"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e?.target?.checked)}
          required
        />
        <Checkbox
          label="I would like to receive promotional emails and updates"
          checked={agreedToNewsletter}
          onChange={(e) => setAgreedToNewsletter(e?.target?.checked)}
        />
      </div>
      {/* Security Notice */}
      <div className="flex items-start space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg mb-6">
        <Icon name="Shield" size={20} className="text-success mt-0.5" />
        <div>
          <p className="text-sm font-medium text-success">256-bit SSL Encryption</p>
          <p className="text-xs text-success/80 mt-1">
            Your personal and payment information is protected with bank-level security
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack} 
          iconName="ArrowLeft" 
          iconPosition="left"
          disabled={isLoading}
        >
          Back to Payment
        </Button>
        <Button 
          type="button" 
          variant="default" 
          onClick={handlePlaceOrder}
          loading={isLoading}
          disabled={!agreedToTerms}
          iconName="ShoppingCart"
          iconPosition="left"
          className="sm:min-w-[200px]"
        >
          {isLoading ? 'Processing Order...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

export default OrderReview;