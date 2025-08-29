import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SortDropdown from './SortDropdown';

const FilterBar = ({ 
  totalProducts, 
  currentSort, 
  onSortChange, 
  onFilterToggle, 
  activeFiltersCount = 0,
  onClearFilters,
  onViewChange,
  initialView = 'grid',
  className = '' 
}) => {
  const [view, setView] = useState(initialView);

  const handleViewChange = (selectedView) => {
    setView(selectedView);
    if (onViewChange) onViewChange(selectedView);
  };

  return (
    <div className={`flex items-center justify-between gap-4 p-4 bg-surface border-b border-border ${className}`}>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterToggle}
          className="md:hidden"
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
        >
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{totalProducts?.toLocaleString()}</span>
          {' '}products found
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {activeFiltersCount > 0 && (
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}

        <SortDropdown
          currentSort={currentSort}
          onSortChange={onSortChange}
        />

        <div className="hidden lg:flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant={view === 'grid' ? 'default' : 'ghost'}
            size="icon"
            className="rounded-none border-r border-border bg-muted"
            onClick={() => handleViewChange('grid')}
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="icon"
            className="rounded-none"
            onClick={() => handleViewChange('list')}
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
