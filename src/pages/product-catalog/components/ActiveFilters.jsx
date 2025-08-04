import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, className = '' }) => {
  const getActiveFilters = () => {
    const active = [];

    // Categories
    if (filters?.categories && filters?.categories?.length > 0) {
      const categoryLabels = {
        'electronics': 'Electronics',
        'clothing': 'Clothing',
        'home-garden': 'Home & Garden',
        'sports': 'Sports & Outdoors',
        'books': 'Books',
        'beauty': 'Beauty & Personal Care'
      };

      filters?.categories?.forEach(categoryId => {
        active?.push({
          type: 'category',
          id: categoryId,
          label: categoryLabels?.[categoryId] || categoryId,
          value: categoryId
        });
      });
    }

    // Brands
    if (filters?.brands && filters?.brands?.length > 0) {
      const brandLabels = {
        'apple': 'Apple',
        'samsung': 'Samsung',
        'nike': 'Nike',
        'adidas': 'Adidas',
        'sony': 'Sony',
        'lg': 'LG'
      };

      filters?.brands?.forEach(brandId => {
        active?.push({
          type: 'brand',
          id: brandId,
          label: brandLabels?.[brandId] || brandId,
          value: brandId
        });
      });
    }

    // Price Range
    if (filters?.priceRange) {
      active?.push({
        type: 'priceRange',
        id: 'price',
        label: filters?.priceRange?.label,
        value: filters?.priceRange
      });
    }

    // Rating
    if (filters?.minRating) {
      active?.push({
        type: 'rating',
        id: 'rating',
        label: `${filters?.minRating}+ Stars`,
        value: filters?.minRating
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filter) => {
    switch (filter?.type) {
      case 'category': onRemoveFilter('categories', filter?.value);
        break;
      case 'brand': onRemoveFilter('brands', filter?.value);
        break;
      case 'priceRange': onRemoveFilter('priceRange', null);
        break;
      case 'rating': onRemoveFilter('minRating', null);
        break;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 p-4 bg-muted/30 border-b border-border ${className}`}>
      <span className="text-sm font-medium text-foreground mr-2">Active filters:</span>
      {activeFilters?.map((filter) => (
        <div
          key={`${filter?.type}-${filter?.id}`}
          className="flex items-center space-x-1 bg-surface border border-border rounded-full px-3 py-1 text-sm"
        >
          <span className="text-foreground">{filter?.label}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveFilter(filter)}
            className="w-4 h-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
          >
            <Icon name="X" size={12} />
          </Button>
        </div>
      ))}
      {activeFilters?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground ml-2"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;