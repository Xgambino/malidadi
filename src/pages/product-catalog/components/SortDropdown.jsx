import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'featured', label: 'Featured', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'name-asc', label: 'Name: A to Z', icon: 'ArrowUp' },
    { value: 'name-desc', label: 'Name: Z to A', icon: 'ArrowDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(prev => !prev)}
        className="justify-between min-w-[200px]"
        iconName="ChevronDown"
        iconPosition="right"
        iconSize={16}
      >
        <div className="flex items-center space-x-2">
          <Icon name={currentOption.icon} size={16} />
          <span className="hidden sm:inline">Sort by:</span>
          <span>{currentOption.label}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-2 z-50 max-h-60 overflow-y-auto">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors duration-150
                ${currentSort === option.value ? 'bg-muted text-primary' : 'text-foreground'}
                first:rounded-t-lg last:rounded-b-lg
                hover:bg-muted
              `}
            >
              <Icon
                name={option.icon}
                size={16}
                className={currentSort === option.value ? 'text-primary' : 'text-muted-foreground'}
              />
              <span>{option.label}</span>
              {currentSort === option.value && (
                <Icon name="Check" size={16} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
