import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleViewDetails = () => {
    navigate('/product-detail', { state: { product } });
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    onAddToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-primary fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-primary fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <div
      className="backdrop-luxury rounded-2xl overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <Image
          src={product?.image}
          alt={product?.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Image" size={48} className="text-primary/50 animate-pulse" />
          </div>
        )}

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Sale Badge */}
        {product?.isOnSale && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-luxury font-bold tracking-wider">
            EXCLUSIVE
          </div>
        )}

        {/* Luxury Badge */}
        {product?.isLuxury && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-luxury font-semibold border border-primary/30">
            LUXURY
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-luxury border border-primary/30 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          onClick={(e) => {
            e?.stopPropagation();
            // Handle wishlist functionality
          }}
          aria-label="Add to wishlist"
        >
          <Icon name="Heart" size={18} className="text-primary hover:text-primary/80" />
        </button>

        {/* Quick View Button */}
        <div className={`absolute inset-x-4 bottom-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Button
            variant="default"
            size="sm"
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold hover:shadow-luxury transition-all duration-300 rounded-full"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-xs text-primary font-luxury tracking-wider uppercase mb-2">
            {product?.category}
          </p>
          <h3 className="font-luxury font-semibold text-foreground text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product?.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {renderRating(product?.rating)}
          </div>
          <span className="text-xs text-muted-foreground font-light">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-luxury font-bold text-primary text-lg">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through font-light">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-xs font-luxury font-semibold text-black bg-primary px-2 py-1 rounded-full">
              {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              product?.inStock ? 'bg-success' : 'bg-error'
            }`} />
            <span className={`text-xs font-luxury font-medium ${
              product?.inStock ? 'text-success' : 'text-error'
            }`}>
              {product?.inStock ? 'Available' : 'Sold Out'}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product?.inStock}
            className="text-xs text-primary hover:text-primary/80 hover:bg-primary/10 p-2 h-auto rounded-full transition-all duration-300"
          >
            <Icon name="ShoppingCart" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;