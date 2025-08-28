import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for demo
  const mockCredentials = {
    email: 'demo@eventhub.com',
    password: 'password123'
  };

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        onSuccess();
      } else {
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error-100 border border-error-500 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error-500 mt-0.5" />
            <div>
              <p className="text-sm text-error-500 font-medium">Authentication Failed</p>
              <p className="text-sm text-error-500 mt-1">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

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
            placeholder="Enter your email"
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

      {/* Password Field */}
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
            placeholder="Enter your password"
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

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-smooth"
        >
          Forgot password?
        </button>
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
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Demo Credentials Info */}
      <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-primary font-medium">Demo Credentials</p>
            <p className="text-sm text-primary mt-1">
              Email: {mockCredentials.email}<br />
              Password: {mockCredentials.password}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;