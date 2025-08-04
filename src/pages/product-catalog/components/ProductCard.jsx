import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e?.stopPropagation();
    setIsLoading(true);
    
    try {
      await onAddToCart(product);
      // Simulate API delay
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleViewDetails = () => {
    navigate('/product-detail', { state: { product } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const discountPercentage = product?.originalPrice 
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={`group bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 cursor-pointer ${className}`}
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Package" size={32} className="text-muted-foreground" />
          </div>
        )}
        
        <Image
          src={product?.image}
          alt={product?.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="bg-surface/80 backdrop-blur-sm hover:bg-surface"
            onClick={(e) => {
              e?.stopPropagation();
              // Handle wishlist toggle
            }}
          >
            <Icon name="Heart" size={16} />
          </Button>
        </div>

        {/* Stock Status */}
        {product?.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground text-sm font-medium px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        {product?.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product?.brand}
          </p>
        )}

        {/* Product Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
          {product?.name}
        </h3>

        {/* Rating */}
        {product?.rating && (
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {renderStars(product?.rating)}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product?.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          loading={isLoading}
          disabled={product?.stock === 0}
          onClick={handleAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
          iconSize={16}
        >
          {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;