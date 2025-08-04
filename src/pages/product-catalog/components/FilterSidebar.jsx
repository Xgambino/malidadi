import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  className = '' 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked 
      ? [...filters?.categories, categoryId]
      : filters?.categories?.filter(id => id !== categoryId);
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const updatedBrands = checked 
      ? [...filters?.brands, brandId]
      : filters?.brands?.filter(id => id !== brandId);
    
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ ...filters, priceRange });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 45 },
    { id: 'clothing', label: 'Clothing', count: 32 },
    { id: 'home-garden', label: 'Home & Garden', count: 28 },
    { id: 'sports', label: 'Sports & Outdoors', count: 19 },
    { id: 'books', label: 'Books', count: 15 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 22 }
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 12 },
    { id: 'samsung', label: 'Samsung', count: 8 },
    { id: 'nike', label: 'Nike', count: 15 },
    { id: 'adidas', label: 'Adidas', count: 11 },
    { id: 'sony', label: 'Sony', count: 9 },
    { id: 'lg', label: 'LG', count: 6 }
  ];

  const priceRanges = [
    { id: 'under-25', label: 'Under $25', min: 0, max: 25 },
    { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
    { id: 'over-200', label: 'Over $200', min: 200, max: null }
  ];

  const ratings = [5, 4, 3, 2, 1];

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
      >
        <span>{title}</span>
        <Icon 
          name={expandedSections?.[sectionKey] ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </button>
      {expandedSections?.[sectionKey] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Categories */}
        <FilterSection title="Categories" sectionKey="category">
          {categories?.map(category => (
            <Checkbox
              key={category?.id}
              label={
                <div className="flex items-center justify-between w-full">
                  <span>{category?.label}</span>
                  <span className="text-xs text-muted-foreground">({category?.count})</span>
                </div>
              }
              checked={filters?.categories?.includes(category?.id)}
              onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
            />
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" sectionKey="price">
          {priceRanges?.map(range => (
            <Checkbox
              key={range?.id}
              label={range?.label}
              checked={filters?.priceRange?.id === range?.id}
              onChange={(e) => handlePriceChange(e?.target?.checked ? range : null)}
            />
          ))}
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands" sectionKey="brand">
          {brands?.map(brand => (
            <Checkbox
              key={brand?.id}
              label={
                <div className="flex items-center justify-between w-full">
                  <span>{brand?.label}</span>
                  <span className="text-xs text-muted-foreground">({brand?.count})</span>
                </div>
              }
              checked={filters?.brands?.includes(brand?.id)}
              onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
            />
          ))}
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" sectionKey="rating">
          {ratings?.map(rating => (
            <Checkbox
              key={rating}
              label={
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& Up</span>
                </div>
              }
              checked={filters?.minRating === rating}
              onChange={(e) => handleRatingChange(e?.target?.checked ? rating : null)}
            />
          ))}
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-64 bg-surface border-r border-border ${className}`}>
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={onClose} />
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-surface shadow-elevation-3">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;