import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RelatedProducts = ({ products = [], currentProductId = null }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const filteredProducts = products
    ?.filter(product => product?.id !== currentProductId)
    ?.slice(0, 4);

  if (filteredProducts?.length === 0) return null;

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">You Might Also Like</h2>
        <Link 
          to="/product-catalog"
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200"
        >
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts?.map((product) => {
          const slug = generateSlug(product?.name);
          return (
            <div
              key={product?.id}
              className="group bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200"
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product?.images?.[0] || product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                    {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
                  </div>
                )}

                {product?.stock === 0 && (
                  <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
                    <span className="bg-error text-error-foreground px-3 py-1 rounded-md text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {product?.name}
                </h3>

                {product?.rating && (
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < Math.floor(product?.rating) ? 'text-warning fill-current' : 'text-border'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product?.reviewCount || 0})
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground text-sm">
                      {formatPrice(product?.price)}
                    </span>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product?.originalPrice)}
                      </span>
                    )}
                  </div>

                  {product?.freeShipping && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Truck" size={12} />
                      <span className="text-xs">Free Shipping</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  {/* Dynamic URL for product detail */}
                  <Link to={`/product-detail/${product?.id}/${slug}`}>
                    <Button variant="outline" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
