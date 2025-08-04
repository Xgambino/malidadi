import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const SearchBar = ({ onSearch = () => {}, placeholder = "Search products...", autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const mockSuggestions = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Beauty & Personal Care',
    'Toys & Games',
    'Automotive'
  ];

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef?.current && !suggestionsRef?.current?.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);

    if (value?.trim()) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setIsOpen(filtered?.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (query?.trim()) {
      onSearch(query?.trim());
      setIsOpen(false);
      setSelectedIndex(-1);
      inputRef?.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef?.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef?.current?.focus();
  };

  return (
    <div className="relative w-full" ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query?.trim() && suggestions?.length > 0 && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Clear search"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>
      {/* Suggestions Dropdown */}
      {isOpen && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-elevation-2 z-50 max-h-60 overflow-y-auto">
          {suggestions?.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                index === selectedIndex ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;