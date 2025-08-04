import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const ProductFormFields = ({ formData, errors, previewMode, onInputChange }) => {
  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'books', label: 'Books & Media' },
    { value: 'jewelry', label: 'Jewelry & Watches' },
    { value: 'automotive', label: 'Automotive' }
  ];

  const formatCurrency = (value) => {
    const numericValue = value?.replace(/[^0-9.]/g, '');
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    return number?.toFixed(2);
  };

  const handlePriceChange = (field, value) => {
    const formatted = formatCurrency(value);
    onInputChange(field, formatted);
  };

  if (previewMode) {
    return (
      <div className="backdrop-luxury rounded-2xl p-6 border border-primary/20">
        <h3 className="text-lg font-luxury font-semibold text-primary mb-6 flex items-center">
          <Icon name="Package" size={20} className="mr-2" />
          Product Details Preview
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-luxury font-bold text-gradient-gold mb-2">
              {formData?.name || 'Product Name'}
            </h4>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Tag" size={16} className="mr-1" />
                {formData?.brand || 'Brand'}
              </span>
              <span className="flex items-center">
                <Icon name="Grid" size={16} className="mr-1" />
                {categoryOptions?.find(cat => cat?.value === formData?.category)?.label || 'Category'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-3xl font-luxury font-bold text-primary">
              ${formData?.price || '0.00'}
            </div>
            {formData?.originalPrice && (
              <div className="text-lg text-muted-foreground line-through">
                ${formData?.originalPrice}
              </div>
            )}
            {formData?.isNew && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/20 border border-success/20">
                <span className="text-xs font-luxury text-success">NEW</span>
              </div>
            )}
          </div>

          <div>
            <h5 className="font-medium text-foreground mb-2">Description</h5>
            <p className="text-muted-foreground leading-relaxed">
              {formData?.description || 'Product description will appear here...'}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-primary/10">
            <div className="flex items-center space-x-2">
              <Icon name="Package" size={16} className="text-primary" />
              <span className="text-sm text-foreground">Stock Available</span>
            </div>
            <span className="font-medium text-primary">
              {formData?.stock || '0'} units
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-luxury rounded-2xl p-6 border border-primary/20">
      <h3 className="text-lg font-luxury font-semibold text-primary mb-6 flex items-center">
        <Icon name="Edit" size={20} className="mr-2" />
        Product Information
      </h3>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Product Name"
            placeholder="Enter product name"
            value={formData?.name}
            onChange={(e) => onInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
            maxLength={100}
            className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
          />

          <Input
            id="brand"
            label="Brand"
            placeholder="Enter brand name"
            value={formData?.brand}
            onChange={(e) => onInputChange('brand', e?.target?.value)}
            error={errors?.brand}
            required
            maxLength={50}
            className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
          />
        </div>

        {/* Image URL */}
        <Input
          id="imageUrl"
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          value={formData?.imageUrl}
          onChange={(e) => onInputChange('imageUrl', e?.target?.value)}
          error={errors?.imageUrl}
          required
          type="url"
          className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
          description="Provide a direct link to the product image"
        />

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              id="price"
              label="Current Price ($)"
              placeholder="0.00"
              value={formData?.price}
              onChange={(e) => handlePriceChange('price', e?.target?.value)}
              error={errors?.price}
              required
              type="number"
              step="0.01"
              min="0"
              max="999999"
              className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
            />
          </div>

          <div>
            <Input
              id="originalPrice"
              label="Original Price ($)"
              placeholder="0.00 (optional)"
              value={formData?.originalPrice}
              onChange={(e) => handlePriceChange('originalPrice', e?.target?.value)}
              error={errors?.originalPrice}
              type="number"
              step="0.01"
              min="0"
              max="999999"
              className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
              description="Show discount by setting original price higher than current price"
            />
          </div>
        </div>

        {/* Category and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            id="category"
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => onInputChange('category', value)}
            error={errors?.category}
            required
            searchable
            className="bg-surface/30"
          />

          <Input
            id="stock"
            label="Stock Quantity"
            placeholder="0"
            value={formData?.stock}
            onChange={(e) => onInputChange('stock', e?.target?.value)}
            error={errors?.stock}
            required
            type="number"
            min="0"
            max="9999"
            className="bg-surface/30 border-primary/20 focus-within:border-primary/40"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Enter detailed product description..."
            value={formData?.description}
            onChange={(e) => onInputChange('description', e?.target?.value)}
            className={`w-full min-h-[120px] p-3 rounded-md border bg-surface/30 border-primary/20 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm placeholder:text-muted-foreground resize-vertical ${
              errors?.description ? 'border-destructive focus:ring-destructive' : ''
            }`}
            maxLength={2000}
            rows={5}
          />
          <div className="flex justify-between items-center mt-1">
            {errors?.description && (
              <p className="text-sm text-destructive">{errors?.description}</p>
            )}
            <p className="text-xs text-muted-foreground ml-auto">
              {formData?.description?.length || 0}/2000 characters
            </p>
          </div>
        </div>

        {/* Product Status */}
        <div className="p-4 rounded-lg bg-surface/20 border border-primary/10">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData?.isNew}
              onChange={(e) => onInputChange('isNew', e?.target?.checked)}
              className="h-4 w-4 rounded border border-primary/30 bg-surface/30 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Mark as New Product</span>
              <p className="text-xs text-muted-foreground">Display "NEW" badge on product listings</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;