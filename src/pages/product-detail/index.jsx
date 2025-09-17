import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import Icon from '../../components/AppIcon';
import { products } from '../../data/db';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // For direct URL linking

  const [cartCount, setCartCount] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Determine current product via state or URL param fallback
  const currentProduct =
    location.state?.product ||
    products.find((p) => p.id === parseInt(id)) ||
    products?.[0];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentProduct]);

  useEffect(() => {
    setSelectedVariant({});
    setQuantity(1);
    window.scrollTo(0, 0);

    // Load cart count from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalItems = existingCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [currentProduct]);

  const handleAddToCart = () => {
    if (!currentProduct?.inStock || currentProduct?.stock === 0) return;

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingIndex = existingCart.findIndex(item => item.id === currentProduct.id);

    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push({
        ...currentProduct,
        selectedVariant,
        quantity,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    const totalItems = existingCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);

    console.log(`Added ${quantity} ${currentProduct?.name} to cart`);
  };

  const handleBuyNow = () => {
    if (!currentProduct?.inStock || currentProduct?.stock === 0) return;

    const newCart = [
      {
        ...currentProduct,
        selectedVariant,
        quantity,
      },
    ];
    localStorage.setItem("cartItems", JSON.stringify(newCart));

    const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);

    navigate('/checkout', { state: { items: newCart } });
  };

  const handleSearchSubmit = (query) => {
    navigate('/product-catalog', { state: { searchQuery: query } });
  };

  const shareProduct = () => {
    const productId = currentProduct?.id;
    const productSlug = currentProduct?.name
      .toLowerCase()
      .replace(/\s+/g, '-');
    const shareableURL = `${window.location.origin}/product-detail/${productId}/${productSlug}`;

    navigator.clipboard
      .writeText(shareableURL)
      .then(() => alert('Product link copied to clipboard!'))
      .catch(() => alert('Failed to copy link.'));
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
      <main className="container mx-auto px-4 py-6 space-y-8 pt-20">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation productData={currentProduct} />

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-3">
            <ProductImageGallery
              images={currentProduct?.images || [currentProduct?.image]}
              productName={currentProduct?.name}
            />
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-4">
            <ProductInfo
              product={currentProduct}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onClick={shareProduct}
            />
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t border-border pt-8">
          <RelatedProducts products={products} currentProductId={currentProduct?.id} />
        </div>
      </main>

      {/* Floating Action Buttons - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 shadow-elevation-3">
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={!currentProduct?.inStock || currentProduct?.stock === 0}
            className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="ShoppingCart" size={18} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!currentProduct?.inStock || currentProduct?.stock === 0}
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
