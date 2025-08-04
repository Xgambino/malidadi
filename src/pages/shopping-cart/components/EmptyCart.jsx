import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/product-catalog');
  };

  return (
    <div className={`text-center py-16 px-4 ${className}`}>
      <div className="max-w-md mx-auto space-y-6">
        {/* Empty Cart Illustration */}
        <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>
        
        {/* Empty State Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            variant="default"
            size="lg"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Truck" size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="RotateCcw" size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Easy Returns</p>
                <p className="text-muted-foreground">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Secure Payment</p>
                <p className="text-muted-foreground">SSL encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;