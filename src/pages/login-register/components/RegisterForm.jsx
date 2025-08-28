import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'personal',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSuccess();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
              errors.firstName ? 'border-error-500' : 'border-border'
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error-500">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
              errors.lastName ? 'border-error-500' : 'border-border'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
              errors.email ? 'border-error-500' : 'border-border'
            }`}
            placeholder="john@example.com"
          />
          <Icon
            name="Mail"
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error-500">{errors.email}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                errors.password ? 'border-error-500' : 'border-border'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error-500">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                errors.confirmPassword ? 'border-error-500' : 'border-border'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Account Type */}
      {/* <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Account Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="accountType"
              value="personal"
              checked={formData.accountType === 'personal'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`p-4 border-2 rounded-lg transition-smooth ${
              formData.accountType === 'personal' ?'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
            }`}>
              <div className="flex items-center space-x-3">
                <Icon name="User" size={20} className={formData.accountType === 'personal' ? 'text-primary' : 'text-text-secondary'} />
                <div>
                  <div className="font-medium text-text-primary">Personal</div>
                  <div className="text-sm text-text-secondary">For individual use</div>
                </div>
              </div>
            </div>
          </label>
          
          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="accountType"
              value="business"
              checked={formData.accountType === 'business'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`p-4 border-2 rounded-lg transition-smooth ${
              formData.accountType === 'business' ?'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
            }`}>
              <div className="flex items-center space-x-3">
                <Icon name="Building" size={20} className={formData.accountType === 'business' ? 'text-primary' : 'text-text-secondary'} />
                <div>
                  <div className="font-medium text-text-primary">Business</div>
                  <div className="text-sm text-text-secondary">For organizations</div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div> */}

      {/* Terms Acceptance */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className={`w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-1 ${
              errors.acceptTerms ? 'border-error-500' : ''
            }`}
          />
          <span className="text-sm text-text-secondary">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-error-500">{errors.acceptTerms}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={20} />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;