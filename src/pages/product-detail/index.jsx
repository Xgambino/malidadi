import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import Icon from '../../components/AppIcon';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(3);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
      price: 199.99,
      originalPrice: 299.99,
      description: `Experience superior sound quality with these premium wireless headphones featuring advanced active noise cancellation technology.\n\nDesigned for audiophiles and professionals, these headphones deliver crystal-clear audio with deep bass and crisp highs. The comfortable over-ear design ensures hours of listening comfort, while the long-lasting battery provides up to 30 hours of playback time.\n\nPerfect for travel, work, or leisure, these headphones are your gateway to immersive audio experiences.`,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop"
      ],
      stock: 15,
      rating: 4.8,
      reviewCount: 324,
      freeShipping: true,
      features: [
        "Active Noise Cancellation Technology",
        "30-hour battery life with quick charge",
        "Premium leather ear cushions",
        "Bluetooth 5.0 connectivity",
        "Built-in microphone for calls",
        "Foldable design for portability"
      ],
      variants: {
        colors: [
          { value: 'black', label: 'Midnight Black', inStock: true },
          { value: 'silver', label: 'Space Silver', inStock: true },
          { value: 'blue', label: 'Ocean Blue', inStock: false }
        ]
      }
    },
    {
      id: 2,
      name: "Smart Fitness Tracker with Heart Rate Monitor",
      price: 89.99,
      originalPrice: 129.99,
      description: `Track your fitness journey with this advanced smart fitness tracker featuring comprehensive health monitoring capabilities.\n\nMonitor your heart rate, steps, calories burned, and sleep patterns with precision. The waterproof design makes it perfect for swimming and intense workouts.\n\nStay connected with smart notifications and enjoy up to 7 days of battery life on a single charge.`,
      images: [
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=800&fit=crop"
      ],
      stock: 8,
      rating: 4.5,
      reviewCount: 156,
      freeShipping: true,
      features: [
        "24/7 Heart Rate Monitoring",
        "Sleep Quality Analysis",
        "Waterproof Design (5ATM)",
        "7-day battery life",
        "Smart notifications",
        "Multiple sport modes"
      ],
      variants: {
        colors: [
          { value: 'black', label: 'Classic Black', inStock: true },
          { value: 'pink', label: 'Rose Pink', inStock: true },
          { value: 'blue', label: 'Navy Blue', inStock: true }
        ],
        sizes: [
          { value: 'small', label: 'Small (38mm)', inStock: true },
          { value: 'large', label: 'Large (42mm)', inStock: true }
        ]
      }
    },
    {
      id: 3,
      name: "Professional 4K Webcam for Streaming",
      price: 149.99,
      description: `Elevate your streaming and video conferencing with this professional-grade 4K webcam.\n\nFeaturing auto-focus, low-light correction, and crystal-clear audio, this webcam is perfect for content creators, professionals, and anyone who demands the best video quality.\n\nPlug-and-play compatibility with all major platforms makes setup effortless.`,
      images: [
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&h=800&fit=crop"
      ],
      stock: 12,
      rating: 4.7,
      reviewCount: 89,
      freeShipping: true,
      features: [
        "4K Ultra HD video recording",
        "Auto-focus technology",
        "Built-in noise-canceling microphone",
        "Low-light correction",
        "Universal compatibility",
        "Privacy shutter included"
      ]
    },
    {
      id: 4,
      name: "Ergonomic Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      description: `Dominate your games with this high-performance wireless gaming mouse designed for competitive gaming.\n\nFeaturing customizable RGB lighting, programmable buttons, and ultra-precise tracking, this mouse gives you the edge you need to win.\n\nThe ergonomic design ensures comfort during extended gaming sessions.`,
      images: [
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop"
      ],
      stock: 0,
      rating: 4.6,
      reviewCount: 203,
      freeShipping: true,
      features: [
        "16,000 DPI precision sensor",
        "Customizable RGB lighting",
        "8 programmable buttons",
        "50-hour battery life",
        "Ergonomic design",
        "Gaming-grade wireless connection"
      ],
      variants: {
        colors: [
          { value: 'black', label: 'Stealth Black', inStock: false },
          { value: 'white', label: 'Arctic White', inStock: false }
        ]
      }
    }
  ];

  // Get current product from location state or default to first product
  const productId = location.state?.productId || 1;
  const currentProduct = mockProducts?.find(p => p?.id === productId) || mockProducts?.[0];

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    // Reset variant selection when product changes
    setSelectedVariant({});
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [productId]);

  const handleAddToCart = () => {
    if (currentProduct?.stock === 0) return;
    
    setCartCount(prev => prev + quantity);
    
    // Show success feedback (you could implement a toast notification here)
    console.log(`Added ${quantity} ${currentProduct?.name} to cart`);
  };

  const handleBuyNow = () => {
    if (currentProduct?.stock === 0) return;
    
    // Add to cart first
    setCartCount(prev => prev + quantity);
    
    // Navigate to checkout
    navigate('/checkout', {
      state: {
        items: [{
          ...currentProduct,
          selectedVariant,
          quantity
        }]
      }
    });
  };

  const handleSearchSubmit = (query) => {
    navigate('/product-catalog', { state: { searchQuery: query } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader cartCount={cartCount} onSearchSubmit={handleSearchSubmit} />
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader cartCount={cartCount} onSearchSubmit={handleSearchSubmit} />
      <main className="container mx-auto px-4 py-6 space-y-8  pt-20">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation productData={currentProduct} />

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Images - Left Column (60% on desktop) */}
          <div className="lg:col-span-3">
            <ProductImageGallery 
              images={currentProduct?.images} 
              productName={currentProduct?.name}
            />
          </div>

          {/* Product Information - Right Column (40% on desktop) */}
          <div className="lg:col-span-2">
            <ProductInfo
              product={currentProduct}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t border-border pt-8">
          <RelatedProducts 
            products={mockProducts} 
            currentProductId={currentProduct?.id}
          />
        </div>
      </main>
      {/* Floating Action Buttons - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 shadow-elevation-3">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={currentProduct?.stock === 0}
            className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="ShoppingCart" size={18} />
            <span>Add to Cart</span>
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={currentProduct?.stock === 0}
            className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="Zap" size={18} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;