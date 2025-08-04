import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartActions = ({ itemCount, onClearCart, className = '' }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClear = async () => {
    setIsClearing(true);
    await onClearCart();
    setIsClearing(false);
    setShowConfirmDialog(false);
  };

  const handleCancelClear = () => {
    setShowConfirmDialog(false);
  };

  if (itemCount === 0) return null;

  return (
    <>
      <div className={`flex items-center justify-between py-4 ${className}`}>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="ShoppingCart" size={16} />
          <span>{itemCount} {itemCount === 1 ? 'item' : 'items'} in cart</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
          onClick={handleClearCart}
          className="text-error hover:text-error hover:bg-error/10"
        >
          Clear Cart
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface border border-border rounded-lg shadow-elevation-3 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Clear Cart</h3>
                <p className="text-sm text-muted-foreground">
                  Are you sure you want to remove all items from your cart?
                </p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              This action cannot be undone. All {itemCount} {itemCount === 1 ? 'item' : 'items'} will be removed from your cart.
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelClear}
                disabled={isClearing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
                onClick={handleConfirmClear}
                loading={isClearing}
                className="flex-1"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartActions;