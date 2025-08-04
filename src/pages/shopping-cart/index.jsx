import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import CartActions from './components/CartActions';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      category: "Clothing",
      price: 29.99,
      quantity: 2,
      image: "https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      category: "Electronics",
      price: 299.99,
      quantity: 1,
      image: "https://images.pixabay.com/photo/2017/08/12/10/16/apple-watch-2634249_1280.jpg?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Eco-Friendly Water Bottle",
      category: "Home & Garden",
      price: 24.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    const loadCartData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCartItems(mockCartItems);
      setIsLoading(false);
    };

    loadCartData();
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleClearCart = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCartItems([]);
  };

  const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Shopping Cart - ReactCommerce</title>
          <meta name="description" content="Review and manage items in your shopping cart" />
        </Helmet>
        <NavigationHeader cartCount={0} />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-muted rounded w-64"></div>
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3]?.map(i => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Shopping Cart ({totalItems}) - ReactCommerce</title>
        <meta name="description" content="Review and manage items in your shopping cart before checkout" />
      </Helmet>
      <NavigationHeader cartCount={totalItems} />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">
              Review your items and proceed to checkout when ready
            </p>
          </div>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* Cart Actions */}
              <CartActions 
                itemCount={totalItems}
                onClearCart={handleClearCart}
                className="border-b border-border"
              />

              {/* Cart Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Desktop Table Header */}
                  <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-3 bg-muted rounded-lg text-sm font-medium text-muted-foreground">
                    <div className="col-span-5">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cartItems?.map(item => (
                      <CartItem
                        key={item?.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <CartSummary items={cartItems} />
                  </div>
                </div>
              </div>

              {/* Mobile Checkout Button */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border shadow-elevation-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    Total ({totalItems} items)
                  </span>
                  <span className="text-lg font-bold text-primary">
                    ${cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0)?.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => window.location.href = '/checkout'}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>

              {/* Mobile Bottom Spacing */}
              <div className="lg:hidden h-24"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;