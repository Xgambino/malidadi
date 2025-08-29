import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterSidebar from './components/FilterSidebar';
import FilterBar from './components/FilterBar';
import ActiveFilters from './components/ActiveFilters';
import ProductGrid from './components/ProductGrid';
import Button from '../../components/ui/Button';
import { products } from '../../data/db';

const ProductCatalog = () => {
  const [cartCount, setCartCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState('featured');
  const [productView, setProductView] = useState('grid');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: null,
    minRating: null
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Category filter (case-insensitive)
    if (filters.categories?.length > 0) {
      const lowerCategories = filters.categories.map(c => c.toLowerCase());
      filtered = filtered.filter(product =>
        product.categories.some(cat => lowerCategories.includes(cat.toLowerCase()))
      );
    }

    // Brand filter (case-insensitive)
    if (filters.brands?.length > 0) {
      const lowerBrands = filters.brands.map(b => b.toLowerCase());
      filtered = filtered.filter(product =>
        lowerBrands.includes(product.brand.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      filtered = filtered.filter(product =>
        max === null ? product.price >= min : product.price >= min && product.price <= max
      );
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(product => product.rating >= filters.minRating);
    }

    // Sorting
    switch (currentSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [products, searchQuery, filters, currentSort]);

  const getActiveFiltersCount = () => {
    return (
      (filters.categories?.length || 0) +
      (filters.brands?.length || 0) +
      (filters.priceRange ? 1 : 0) +
      (filters.minRating ? 1 : 0)
    );
  };

  const handleAddToCart = async (product) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // simulate API
    setCartCount(prev => prev + 1);
    setLoading(false);
  };

  const handleSearchSubmit = (query) => setSearchQuery(query);
  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleClearFilters = () => setFilters({ categories: [], brands: [], priceRange: null, minRating: null });
  const handleRemoveFilter = (filterType, value) => {
    switch (filterType) {
      case 'categories':
        setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== value) }));
        break;
      case 'brands':
        setFilters(prev => ({ ...prev, brands: prev.brands.filter(id => id !== value) }));
        break;
      case 'priceRange':
        setFilters(prev => ({ ...prev, priceRange: null }));
        break;
      case 'minRating':
        setFilters(prev => ({ ...prev, minRating: null }));
        break;
    }
  };
  const handleSortChange = (sortValue) => setCurrentSort(sortValue);
  const toggleFilterSidebar = () => setIsFilterOpen(!isFilterOpen);
  const closeFilterSidebar = () => setIsFilterOpen(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsFilterOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Product Catalog - Malidadi</title>
        <meta name="description" content="Browse our extensive collection of African-inspired products." />
      </Helmet>

      <NavigationHeader cartCount={cartCount} onSearchSubmit={handleSearchSubmit} />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20">
        <BreadcrumbNavigation className="mb-6" />

        <div className="flex gap-6">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onClose={closeFilterSidebar}
          />

          <div className="flex-1 min-w-0">
            <FilterBar
              totalProducts={filteredAndSortedProducts.length}
              currentSort={currentSort}
              onSortChange={handleSortChange}
              onFilterToggle={toggleFilterSidebar}
              activeFiltersCount={getActiveFiltersCount()}
              onClearFilters={handleClearFilters}
              onViewChange={setProductView}
            />

            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearFilters}
            />

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

            <div className="p-4 md:p-6">
              <ProductGrid
                products={filteredAndSortedProducts}
                onAddToCart={handleAddToCart}
                loading={loading}
                view={productView}
              />
            </div>

            {filteredAndSortedProducts.length > 0 && (
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
