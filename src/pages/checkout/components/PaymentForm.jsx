import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onNext, onBack, formData, setFormData, isVisible = true }) => {
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  const cardTypeOptions = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' }
  ];

  const expiryMonthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const expiryYearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date()?.getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!formData?.cardNumber?.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/?.test(formData?.cardNumber?.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!formData?.cardName?.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }

      if (!formData?.expiryMonth) {
        newErrors.expiryMonth = 'Expiry month is required';
      }

      if (!formData?.expiryYear) {
        newErrors.expiryYear = 'Expiry year is required';
      }

      if (!formData?.cvv?.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/?.test(formData?.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="CreditCard" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Payment Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Payment Method</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                paymentMethod === 'card' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="CreditCard" size={20} />
              <span className="font-medium">Credit Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                paymentMethod === 'paypal' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="Wallet" size={20} />
              <span className="font-medium">PayPal</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('apple')}
              className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                paymentMethod === 'apple' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
              }`}
            >
              <Icon name="Smartphone" size={20} />
              <span className="font-medium">Apple Pay</span>
            </button>
          </div>
        </div>

        {/* Credit Card Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData?.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
              error={errors?.cardNumber}
              maxLength={19}
              required
            />

            <Input
              label="Cardholder Name"
              type="text"
              placeholder="Enter name as shown on card"
              value={formData?.cardName || ''}
              onChange={(e) => handleInputChange('cardName', e?.target?.value)}
              error={errors?.cardName}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Select
                label="Month"
                placeholder="MM"
                options={expiryMonthOptions}
                value={formData?.expiryMonth || ''}
                onChange={(value) => handleInputChange('expiryMonth', value)}
                error={errors?.expiryMonth}
                required
              />
              <Select
                label="Year"
                placeholder="YYYY"
                options={expiryYearOptions}
                value={formData?.expiryYear || ''}
                onChange={(value) => handleInputChange('expiryYear', value)}
                error={errors?.expiryYear}
                required
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={formData?.cvv || ''}
                onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                error={errors?.cvv}
                maxLength={4}
                required
              />
            </div>
          </div>
        )}

        {/* Alternative Payment Methods */}
        {paymentMethod === 'paypal' && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <Icon name="Wallet" size={48} className="mx-auto mb-4 text-primary" />
            <p className="text-foreground font-medium mb-2">Pay with PayPal</p>
            <p className="text-sm text-muted-foreground">You'll be redirected to PayPal to complete your payment</p>
          </div>
        )}

        {paymentMethod === 'apple' && (
          <div className="p-6 bg-muted rounded-lg text-center">
            <Icon name="Smartphone" size={48} className="mx-auto mb-4 text-primary" />
            <p className="text-foreground font-medium mb-2">Pay with Apple Pay</p>
            <p className="text-sm text-muted-foreground">Use Touch ID or Face ID to complete your payment</p>
          </div>
        )}

        {/* Billing Address Checkbox */}
        <Checkbox
          label="Billing address is the same as shipping address"
          checked={formData?.sameAsShipping || false}
          onChange={(e) => handleInputChange('sameAsShipping', e?.target?.checked)}
        />

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <p className="text-sm font-medium text-success">Secure Payment</p>
            <p className="text-xs text-success/80 mt-1">Your payment information is encrypted and secure</p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
            Back to Shipping
          </Button>
          <Button type="submit" variant="default" iconName="ArrowRight" iconPosition="right">
            Review Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;