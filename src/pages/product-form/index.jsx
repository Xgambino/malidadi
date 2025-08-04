import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProductImagePreview from './components/ProductImagePreview';
import ProductFormFields from './components/ProductFormFields';
import FormActions from './components/FormActions';

const ProductForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id');
  const isEditMode = !!productId;

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    brand: '',
    stock: '',
    isNew: false,
    originalPrice: ''
  });

  // Load cart count
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        const totalItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Load existing product data for editing
  useEffect(() => {
    if (isEditMode && productId) {
      const savedProducts = localStorage.getItem('admin-products');
      if (savedProducts) {
        try {
          const products = JSON.parse(savedProducts);
          const product = products?.find(p => p?.id === parseInt(productId));
          if (product) {
            setFormData({
              name: product?.name || '',
              price: product?.price?.toString() || '',
              description: product?.description || '',
              category: product?.category || '',
              imageUrl: product?.image || '',
              brand: product?.brand || '',
              stock: product?.stock?.toString() || '',
              isNew: product?.isNew || false,
              originalPrice: product?.originalPrice?.toString() || ''
            });
          }
        } catch (error) {
          console.error('Error loading product:', error);
        }
      }
    }
  }, [isEditMode, productId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData?.name?.length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    } else if (formData?.name?.length > 100) {
      newErrors.name = 'Product name must be less than 100 characters';
    }

    if (!formData?.price?.trim()) {
      newErrors.price = 'Price is required';
    } else {
      const price = parseFloat(formData?.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = 'Please enter a valid price greater than 0';
      } else if (price > 999999) {
        newErrors.price = 'Price cannot exceed $999,999';
      }
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData?.description?.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData?.description?.length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }

    if (!formData?.category?.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.imageUrl?.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else {
      try {
        new URL(formData?.imageUrl);
      } catch {
        newErrors.imageUrl = 'Please enter a valid URL';
      }
    }

    if (!formData?.brand?.trim()) {
      newErrors.brand = 'Brand is required';
    } else if (formData?.brand?.length < 2) {
      newErrors.brand = 'Brand must be at least 2 characters';
    }

    if (!formData?.stock?.trim()) {
      newErrors.stock = 'Stock quantity is required';
    } else {
      const stock = parseInt(formData?.stock);
      if (isNaN(stock) || stock < 0) {
        newErrors.stock = 'Please enter a valid stock quantity';
      } else if (stock > 9999) {
        newErrors.stock = 'Stock cannot exceed 9999';
      }
    }

    if (formData?.originalPrice?.trim()) {
      const originalPrice = parseFloat(formData?.originalPrice);
      const currentPrice = parseFloat(formData?.price);
      if (isNaN(originalPrice) || originalPrice <= 0) {
        newErrors.originalPrice = 'Please enter a valid original price';
      } else if (originalPrice <= currentPrice) {
        newErrors.originalPrice = 'Original price must be higher than current price';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)?.[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const productData = {
        id: isEditMode ? parseInt(productId) : Date.now(),
        name: formData?.name?.trim(),
        price: parseFloat(formData?.price),
        originalPrice: formData?.originalPrice ? parseFloat(formData?.originalPrice) : null,
        description: formData?.description?.trim(),
        category: formData?.category,
        image: formData?.imageUrl?.trim(),
        brand: formData?.brand?.trim(),
        stock: parseInt(formData?.stock),
        isNew: formData?.isNew,
        rating: isEditMode ? null : 4.5,
        reviewCount: isEditMode ? null : 0,
        createdAt: isEditMode ? null : new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      // Save to localStorage
      const savedProducts = localStorage.getItem('admin-products');
      let products = savedProducts ? JSON.parse(savedProducts) : [];

      if (isEditMode) {
        const index = products?.findIndex(p => p?.id === parseInt(productId));
        if (index !== -1) {
          products[index] = { ...products?.[index], ...productData };
        }
      } else {
        products?.push(productData);
      }

      localStorage.setItem('admin-products', JSON.stringify(products));

      // Show success message and redirect
      alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
      navigate('/admin-dashboard');

    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/admin-dashboard');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All changes will be lost.')) {
      if (isEditMode) {
        // Reload original data
        const savedProducts = localStorage.getItem('admin-products');
        if (savedProducts) {
          try {
            const products = JSON.parse(savedProducts);
            const product = products?.find(p => p?.id === parseInt(productId));
            if (product) {
              setFormData({
                name: product?.name || '',
                price: product?.price?.toString() || '',
                description: product?.description || '',
                category: product?.category || '',
                imageUrl: product?.image || '',
                brand: product?.brand || '',
                stock: product?.stock?.toString() || '',
                isNew: product?.isNew || false,
                originalPrice: product?.originalPrice?.toString() || ''
              });
            }
          } catch (error) {
            console.error('Error reloading product:', error);
          }
        }
      } else {
        // Clear form
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          imageUrl: '',
          brand: '',
          stock: '',
          isNew: false,
          originalPrice: ''
        });
      }
      setErrors({});
    }
  };

  const handleSearchSubmit = (query) => {
    navigate(`/product-catalog?search=${encodeURIComponent(query)}`);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? 'Edit Product' : 'Create New Product'} - LUXURIA Admin</title>
        <meta name="description" content={isEditMode ? 'Edit product details in LUXURIA admin panel' : 'Create a new luxury product in LUXURIA admin panel'} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationHeader
          cartCount={cartCount}
          onSearchSubmit={handleSearchSubmit}
        />

        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation 
            items={[
              { label: 'Admin Dashboard', href: '/admin-dashboard' },
              { label: isEditMode ? 'Edit Product' : 'Create Product', href: '/product-form' }
            ]}
            className="mb-6" 
          />

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="backdrop-luxury rounded-2xl p-8 border border-primary/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-luxury font-bold text-gradient-gold mb-2">
                    {isEditMode ? 'Edit Product' : 'Create New Product'}
                  </h1>
                  <p className="text-muted-foreground">
                    {isEditMode 
                      ? 'Update product details for your luxury collection'
                      : 'Add a new exquisite piece to your luxury collection'
                    }
                  </p>
                </div>
                <button
                  onClick={togglePreview}
                  className="px-6 py-3 bg-secondary/20 text-foreground border border-primary/20 rounded-full hover:bg-primary/10 transition-all duration-300 font-luxury"
                >
                  {previewMode ? 'Edit Mode' : 'Preview Mode'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image Preview Column */}
                <div className="lg:col-span-1">
                  <ProductImagePreview
                    imageUrl={formData?.imageUrl}
                    productName={formData?.name}
                    previewMode={previewMode}
                  />
                </div>

                {/* Form Fields Column */}
                <div className="lg:col-span-2">
                  <ProductFormFields
                    formData={formData}
                    errors={errors}
                    previewMode={previewMode}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <FormActions
                isEditMode={isEditMode}
                loading={loading}
                previewMode={previewMode}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onReset={handleReset}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;