import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ onNext, formData, setFormData, isVisible = true }) => {
  const [errors, setErrors] = useState({});

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ];

  const stateOptions = [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData?.city?.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData?.state) {
      newErrors.state = 'State is required';
    }

    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    if (!formData?.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Truck" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Shipping Information</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll send order updates to this email"
          required
        />

        <Input
          label="Street Address"
          type="text"
          placeholder="Enter your street address"
          value={formData?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Select
            label="State"
            placeholder="Select state"
            options={stateOptions}
            value={formData?.state || ''}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            placeholder="12345"
            value={formData?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>

        <Select
          label="Country"
          placeholder="Select country"
          options={countryOptions}
          value={formData?.country || ''}
          onChange={(value) => handleInputChange('country', value)}
          error={errors?.country}
          required
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="default" iconName="ArrowRight" iconPosition="right">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;