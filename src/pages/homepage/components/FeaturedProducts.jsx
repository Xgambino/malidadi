import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Button from '../../../components/ui/Button';

const FeaturedProducts = ({ onAddToCart, currentSlide }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const luxuryProducts = [
  {
    id: 1,
    name: "Swiss Heritage Chronograph",
    category: "timepieces",
    price: 2499.99,
    originalPrice: 2999.99,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 187,
    inStock: true,
    isOnSale: true,
    description: "Exquisite Swiss-made chronograph with sapphire crystal and premium leather strap.",
    isLuxury: true
  },
  {
    id: 2,
    name: "Diamond Eternity Necklace",
    category: "jewelry",
    price: 4299.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5.0,
    reviewCount: 94,
    inStock: true,
    isOnSale: false,
    description: "Handcrafted 18k gold necklace featuring ethically sourced diamonds.",
    isLuxury: true
  },
  {
    id: 3,
    name: "Italian Leather Briefcase",
    category: "accessories",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    isOnSale: true,
    description: "Premium Italian leather briefcase with hand-stitched details and brass hardware.",
    isLuxury: true
  },
  {
    id: 4,
    name: "Crystal Decanter Set",
    category: "home collection",
    price: 649.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
    isOnSale: false,
    description: "Hand-cut crystal decanter set with matching glasses, perfect for connoisseurs.",
    isLuxury: true
  },
  {
    id: 5,
    name: "Cashmere Luxury Scarf",
    category: "fashion",
    price: 389.99,
    originalPrice: 459.99,
    image: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewCount: 203,
    inStock: false,
    isOnSale: true,
    description: "Ultra-soft cashmere scarf woven by master artisans in Scotland.",
    isLuxury: true
  },
  {
    id: 6,
    name: "Vintage Cognac Collection",
    category: "spirits",
    price: 1899.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    isOnSale: false,
    description: "Rare vintage cognac aged for 25 years in French oak barrels.",
    isLuxury: true
  },
  {
    id: 7,
    name: "Silk Persian Rug",
    category: "home collection",
    price: 3299.99,
    originalPrice: 3899.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 5.0,
    reviewCount: 45,
    inStock: true,
    isOnSale: true,
    description: "Hand-knotted silk Persian rug with intricate traditional patterns.",
    isLuxury: true
  },
  {
    id: 8,
    name: "Artisan Fountain Pen",
    category: "writing instruments",
    price: 789.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    isOnSale: false,
    description: "Handcrafted fountain pen with 18k gold nib and ebony barrel.",
    isLuxury: true
  }];


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(luxuryProducts);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(4); // Mobile: 2x2 grid
      } else if (width < 1024) {
        setItemsPerPage(6); // Tablet: 3x2 grid
      } else {
        setItemsPerPage(8); // Desktop: 4x2 grid
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const currentProducts = products?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (loading) {
    return (
      <section className="py-20 md:py-24 lg:py-32 bg-gradient-luxury">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-2 rounded-full backdrop-luxury border border-primary/30 mb-8">
              <span className="text-primary text-sm font-luxury tracking-wider">CURATED COLLECTION</span>
            </div>
            <div className="h-12 bg-muted/20 rounded mb-6 animate-pulse" />
            <div className="h-6 bg-muted/20 rounded w-2/3 mx-auto animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: itemsPerPage })?.map((_, index) =>
            <div key={index} className="backdrop-luxury rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-muted/20" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted/20 rounded" />
                  <div className="h-3 bg-muted/20 rounded w-2/3" />
                  <div className="h-4 bg-muted/20 rounded w-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gradient-luxury">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-luxury-fade">
          <div className="inline-flex items-center px-6 py-2 rounded-full backdrop-luxury border border-primary/30 mb-8">
            <span className="text-primary text-sm font-luxury tracking-wider">CURATED COLLECTION</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-luxury font-bold text-gradient-gold mb-6">
            Masterfully Curated
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Each piece in our collection represents the pinnacle of craftsmanship, carefully selected for the most discerning clientele who appreciate true luxury and timeless elegance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {currentProducts?.map((product, index) =>
          <div
            key={product?.id}
            className="animate-luxury-fade"
            style={{ animationDelay: `${index * 100}ms` }}>

              <ProductCard
              product={product}
              onAddToCart={onAddToCart} />

            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 &&
        <div className="flex items-center justify-center space-x-6 mb-12">
            <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
            className="border-primary/30 text-primary hover:bg-primary/10 font-luxury">

              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages })?.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-10 h-10 rounded-full text-sm font-luxury font-medium transition-all duration-300 ${
              index === currentSlide ?
              'bg-primary text-black shadow-luxury' :
              'bg-surface/20 text-primary hover:bg-primary/20 border border-primary/30'}`
              }>

                  {index + 1}
                </button>
            )}
            </div>
            
            <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
            className="border-primary/30 text-primary hover:bg-primary/10 font-luxury">

              Next
            </Button>
          </div>
        }

        {/* View All Collections Button */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => window.location.href = '/product-catalog'}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={20}
            className="bg-gradient-to-r from-primary to-yellow-400 text-black font-luxury font-semibold px-12 py-4 rounded-full hover:shadow-luxury transition-all duration-300 hover:scale-105 text-lg">

            Explore Full Collection
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedProducts;