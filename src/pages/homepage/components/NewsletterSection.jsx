import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email?.includes('@') || !email?.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError('');
  };

  if (isSubscribed) {
    return (
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Thank You for Subscribing!
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-8">
              You'll receive our latest updates, exclusive offers, and product announcements directly in your inbox.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary to-primary/80">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <Icon name="Mail" size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  error={error}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                loading={isLoading}
                disabled={isLoading}
                iconName="Send"
                iconPosition="right"
                iconSize={16}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Percent" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Exclusive Deals</h3>
              <p className="text-white/80 text-sm">
                Get access to subscriber-only discounts and early bird offers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">New Arrivals</h3>
              <p className="text-white/80 text-sm">
                Be the first to discover our latest products and collections
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Gift" size={24} className="text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Special Events</h3>
              <p className="text-white/80 text-sm">
                Invitations to exclusive sales events and product launches
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <p className="text-white/70 text-xs mt-8">
            We respect your privacy. Unsubscribe at any time. 
            <button className="underline hover:text-white transition-colors duration-200 ml-1">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;