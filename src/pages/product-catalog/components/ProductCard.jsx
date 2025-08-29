import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToCart, view = 'grid', className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e?.stopPropagation();
    setIsLoading(true);
    try {
      await onAddToCart(product);
      setTimeout(() => setIsLoading(false), 500);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Navigate to product detail page via URL parameters
  const handleViewDetails = () => {
    const slug = product?.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product-detail/${product?.id}/${slug}`);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })?.format(price);

  const renderStars = (rating) =>
    [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));

  return (
    <div
      className={`group bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-300 cursor-pointer
        ${view === 'list' ? 'flex flex-col sm:flex-row gap-4' : ''}
        ${className}`}
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div
        className={`overflow-hidden bg-muted 
          ${view === 'list' ? 'w-full sm:w-32 flex-shrink-0 aspect-[2/1] sm:aspect-square' : 'relative aspect-square'}`}
      >
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
      </div>

      {/* Product Info */}
      <div className={`p-4 flex-1 flex flex-col justify-between`}>
        <div>
          {product?.brand && (
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product?.brand}</p>
          )}
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
            {product?.name}
          </h3>

          {product?.rating && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex items-center">{renderStars(product?.rating)}</div>
              <span className="text-xs text-muted-foreground">({product?.reviewCount || 0})</span>
            </div>
          )}

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-semibold text-foreground">{formatPrice(product?.price)}</span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product?.originalPrice)}</span>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth={view === 'grid'}
          loading={isLoading}
          disabled={product?.stock === 0}
          onClick={handleAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
          iconSize={16}
          className={view === 'list' ? 'mt-2 self-start' : ''}
        >
          {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
