import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        'Fashion',
        'Accessories',
        'Electronics',
        'Home & Garden',
        'Beauty',
        'Sports',
        'Books',
        'Other'
    ];

    useEffect(() => {
        if (product) {
            setFormData({
                name: product?.name || '',
                price: product?.price?.toString() || '',
                category: product?.category || '',
                image: product?.image || '',
                description: product?.description || ''
            });
        }
    }, [product]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.name?.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData?.price?.trim()) {
            newErrors.price = 'Price is required';
        } else {
            const price = parseFloat(formData?.price);
            if (isNaN(price) || price <= 0) {
                newErrors.price = 'Price must be a valid positive number';
            }
        }

        if (!formData?.category?.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData?.description?.trim()) {
            newErrors.description = 'Description is required';
        }

        if (formData?.image?.trim()) {
            try {
                new URL(formData.image);
            } catch {
                newErrors.image = 'Please enter a valid image URL';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData?.price),
                image: formData?.image?.trim() || '/assets/images/no_image.png'
            };

            await onSave?.(productData);
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors?.[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-card rounded-lg border border-border shadow-luxury max-h-[90vh] overflow-y-auto"
            >
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-luxury text-gradient-gold">
                                {product ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                {product ? 'Update product information' : 'Create a new product for your catalog'}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onCancel}
                            className="hover:bg-muted"
                        >
                            <Icon name="X" size={20} />
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Product Name"
                            type="text"
                            value={formData?.name || ''}
                            onChange={(e) => handleInputChange('name', e?.target?.value)}
                            error={errors?.name}
                            placeholder="Enter product name"
                            required
                        />

                        <Input
                            label="Price"
                            type="number"
                            value={formData?.price || ''}
                            onChange={(e) => handleInputChange('price', e?.target?.value)}
                            error={errors?.price}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Category <span className="text-destructive">*</span>
                            </label>
                            <select
                                value={formData?.category || ''}
                                onChange={(e) => handleInputChange('category', e?.target?.value)}
                                className={`h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                    errors?.category 
                                        ? 'border-destructive focus-visible:ring-destructive' :'border-input bg-background'
                                }`}
                                required
                            >
                                <option value="">Select category</option>
                                {categories?.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors?.category && (
                                <p className="text-sm text-destructive">{errors?.category}</p>
                            )}
                        </div>

                        <Input
                            label="Image URL"
                            type="url"
                            value={formData?.image || ''}
                            onChange={(e) => handleInputChange('image', e?.target?.value)}
                            error={errors?.image}
                            placeholder="https://example.com/image.jpg"
                            description="Optional: Leave empty to use default image"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                            Description <span className="text-destructive">*</span>
                        </label>
                        <textarea
                            value={formData?.description || ''}
                            onChange={(e) => handleInputChange('description', e?.target?.value)}
                            className={`min-h-[100px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                errors?.description 
                                    ? 'border-destructive focus-visible:ring-destructive' :'border-input bg-background'
                            }`}
                            placeholder="Enter product description..."
                            rows="4"
                            required
                        />
                        {errors?.description && (
                            <p className="text-sm text-destructive">{errors?.description}</p>
                        )}
                    </div>

                    {/* Image Preview */}
                    {formData?.image && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Image Preview
                            </label>
                            <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted border border-border">
                                <img
                                    src={formData?.image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/assets/images/no_image.png';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-4 pt-6 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            iconName={product ? "Save" : "Plus"}
                            className="shadow-luxury"
                        >
                            {product ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ProductForm;