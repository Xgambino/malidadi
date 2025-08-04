import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, className = '' }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(item?.id);
    setIsRemoving(false);
  };

  const itemTotal = item?.price * item?.quantity;

  return (
    <div className={`bg-surface border border-border rounded-lg p-4 md:p-6 transition-all duration-200 ${isRemoving ? 'opacity-50' : ''} ${className}`}>
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <div className="flex space-x-4">
          <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
              {item?.name}
            </h3>
            <p className="text-muted-foreground text-xs mb-2">
              {item?.category}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary text-lg">
                ${item?.price?.toFixed(2)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconSize={16}
                onClick={handleRemove}
                disabled={isRemoving}
                className="text-error hover:text-error hover:bg-error/10"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Minus"
              iconSize={14}
              onClick={() => handleQuantityChange(item?.quantity - 1)}
              disabled={item?.quantity <= 1}
              className="w-8 h-8 p-0"
            />
            <span className="font-medium text-foreground min-w-[2rem] text-center">
              {item?.quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconSize={14}
              onClick={() => handleQuantityChange(item?.quantity + 1)}
              className="w-8 h-8 p-0"
            />
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-semibold text-foreground text-lg">
              ${itemTotal?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-base mb-1">
            {item?.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {item?.category}
          </p>
        </div>
        
        <div className="text-center">
          <p className="font-semibold text-primary text-lg">
            ${item?.price?.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Minus"
            iconSize={14}
            onClick={() => handleQuantityChange(item?.quantity - 1)}
            disabled={item?.quantity <= 1}
            className="w-8 h-8 p-0"
          />
          <span className="font-medium text-foreground min-w-[3rem] text-center">
            {item?.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconSize={14}
            onClick={() => handleQuantityChange(item?.quantity + 1)}
            className="w-8 h-8 p-0"
          />
        </div>
        
        <div className="text-center min-w-[5rem]">
          <p className="font-semibold text-foreground text-lg">
            ${itemTotal?.toFixed(2)}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Trash2"
          iconSize={16}
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-error hover:text-error hover:bg-error/10"
        />
      </div>
    </div>
  );
};

export default CartItem;