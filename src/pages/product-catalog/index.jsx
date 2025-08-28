import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterSidebar from './components/FilterSidebar';
import FilterBar from './components/FilterBar';
import ActiveFilters from './components/ActiveFilters';
import ProductGrid from './components/ProductGrid';

import Button from '../../components/ui/Button';

const ProductCatalog = () => {
  const [cartCount, setCartCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('featured');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: null,
    minRating: null
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      brand: "Apple",
      price: 1199.99,
      originalPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 2847,
      category: "electronics",
      stock: 15,
      isNew: true
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB Titanium Black",
      brand: "Samsung",
      price: 1099.99,
      originalPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 1923,
      category: "electronics",
      stock: 8,
      isNew: false
    },
    {
      id: 3,
      name: "Nike Air Max 270 React Running Shoes",
      brand: "Nike",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 856,
      category: "sports",
      stock: 23,
      isNew: false
    },
    {
      id: 4,
      name: "Adidas Ultraboost 22 Performance Running Shoes",
      brand: "Adidas",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 1247,
      category: "sports",
      stock: 12,
      isNew: true
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      brand: "Sony",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.9,
      reviewCount: 3421,
      category: "electronics",
      stock: 7,
      isNew: false
    },
    {
      id: 6,
      name: "LG 55-Inch OLED C3 Series 4K Smart TV",
      brand: "LG",
      price: 1299.99,
      originalPrice: 1599.99,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 892,
      category: "electronics",
      stock: 5,
      isNew: false
    },
    {
      id: 7,
      name: "Premium Cotton Blend Casual T-Shirt",
      brand: "Generic",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.2,
      reviewCount: 456,
      category: "clothing",
      stock: 45,
      isNew: false
    },
    {
      id: 8,
      name: "Organic Skincare Set with Vitamin C Serum",
      brand: "Beauty Co",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 723,
      category: "beauty",
      stock: 18,
      isNew: true
    },
    {
      id: 9,
      name: "Modern Ceramic Plant Pot Set of 3",
      brand: "Home Decor",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 234,
      category: "home-garden",
      stock: 31,
      isNew: false
    },
    {
      id: 10,
      name: "The Psychology of Programming - Technical Book",
      brand: "Tech Books",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 167,
      category: "books",
      stock: 22,
      isNew: false
    },
    {
      id: 11,
      name: "Wireless Bluetooth Gaming Controller",
      brand: "Gaming Pro",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 1089,
      category: "electronics",
      stock: 0,
      isNew: false
    },
    {
      id: 12,
      name: "Stainless Steel Water Bottle 32oz",
      brand: "EcoLife",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      rating: 4.5,
      reviewCount: 892,
      category: "sports",
      stock: 67,
      isNew: true
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.brand?.toLowerCase()?.includes(query) ||
        product?.category?.toLowerCase()?.includes(query)
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.brands?.includes(product?.brand?.toLowerCase())
      );
    }

    // Apply price range filter
    if (filters?.priceRange) {
      const { min, max } = filters?.priceRange;
      filtered = filtered?.filter(product => {
        if (max === null) return product?.price >= min;
        return product?.price >= min && product?.price <= max;
      });
    }

    // Apply rating filter
    if (filters?.minRating) {
      filtered = filtered?.filter(product =>
        product?.rating >= filters?.minRating
      );
    }

    // Apply sorting
    switch (currentSort) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'name-asc':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-desc':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      default: // featured
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
    }

    return filtered;
  }, [mockProducts, searchQuery, filters, currentSort]);

  const getActiveFiltersCount = () => {
    return (filters?.categories?.length +
    filters?.brands?.length +
    (filters?.priceRange ? 1 : 0) + (filters?.minRating ? 1 : 0));
  };

  const handleAddToCart = async (product) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setCartCount(prev => prev + 1);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: null,
      minRating: null
    });
  };

  const handleRemoveFilter = (filterType, value) => {
    switch (filterType) {
      case 'categories':
        setFilters(prev => ({
          ...prev,
          categories: prev?.categories?.filter(id => id !== value)
        }));
        break;
      case 'brands':
        setFilters(prev => ({
          ...prev,
          brands: prev?.brands?.filter(id => id !== value)
        }));
        break;
      case 'priceRange':
        setFilters(prev => ({ ...prev, priceRange: null }));
        break;
      case 'minRating':
        setFilters(prev => ({ ...prev, minRating: null }));
        break;
    }
  };

  const handleSortChange = (sortValue) => {
    setCurrentSort(sortValue);
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilterSidebar = () => {
    setIsFilterOpen(false);
  };

  // Close mobile filter on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Product Catalog - ReactCommerce</title>
        <meta name="description" content="Browse our extensive collection of products with advanced filtering and sorting options." />
      </Helmet>
      <NavigationHeader
        cartCount={cartCount}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20">
        <BreadcrumbNavigation className="mb-6" />

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onClose={closeFilterSidebar}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Filter Bar */}
            <FilterBar
              totalProducts={filteredAndSortedProducts?.length}
              currentSort={currentSort}
              onSortChange={handleSortChange}
              onFilterToggle={toggleFilterSidebar}
              activeFiltersCount={getActiveFiltersCount()}
              onClearFilters={handleClearFilters}
            />

            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearFilters}
            />

            {/* Search Results Header */}
            {searchQuery && (
              <div className="p-4 bg-muted/30 border-b border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Search results for <span className="font-medium text-foreground">"{searchQuery}"</span>
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    iconName="X"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Clear search
                  </Button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="p-4 md:p-6">
              <ProductGrid
                products={filteredAndSortedProducts}
                onAddToCart={handleAddToCart}
                loading={loading}
              />
            </div>

            {/* Load More Button (Future Enhancement) */}
            {filteredAndSortedProducts?.length > 0 && (
              <div className="flex justify-center p-6">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="right"
                  iconSize={16}
                >
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;