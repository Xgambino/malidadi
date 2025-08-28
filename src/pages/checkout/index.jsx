import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from './components/CheckoutHeader';
import ProgressIndicator from './components/ProgressIndicator';
import ShippingForm from './components/ShippingForm';
import PaymentForm from './components/PaymentForm';
import OrderReview from './components/OrderReview';
import OrderSummary from './components/OrderSummary';
import NavigationHeader from "components/ui/NavigationHeader";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    sameAsShipping: true
  });

  const [cartItems] = useState([
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
  ]);

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert(`Order placed successfully!\n\nOrder Details:\nName: ${formData?.firstName} ${formData?.lastName}\nEmail: ${formData?.email}\nTotal Items: ${cartItems?.length}\n\nThank you for your purchase!`);
    navigate('/homepage');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader/>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 pt-20">
        {/* Progress Indicator - Mobile and Desktop */}
        <div className="max-w-2xl mx-auto lg:max-w-none mb-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mobile Step Navigation */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-foreground">
                  {currentStep === 1 && 'Shipping Information'}
                  {currentStep === 2 && 'Payment Details'}
                  {currentStep === 3 && 'Review Order'}
                </h1>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 3
                </span>
              </div>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase securely</p>
            </div>

            {/* Form Steps */}
            <ShippingForm
              onNext={handleNextStep}
              formData={formData}
              setFormData={setFormData}
              isVisible={currentStep === 1}
            />

            <PaymentForm
              onNext={handleNextStep}
              onBack={handlePrevStep}
              formData={formData}
              setFormData={setFormData}
              isVisible={currentStep === 2}
            />

            <OrderReview
              onBack={handlePrevStep}
              onPlaceOrder={handlePlaceOrder}
              formData={formData}
              isVisible={currentStep === 3}
            />
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary cartItems={cartItems} />
              
              {/* Trust Signals */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-success font-bold text-xs">✓</span>
                  </div>
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-success font-bold text-xs">✓</span>
                  </div>
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-success font-bold text-xs">✓</span>
                  </div>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;