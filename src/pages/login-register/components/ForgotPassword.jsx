import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ForgotPassword = ({ onBack }) => {
  const [step, setStep] = useState('email'); // email, code, reset, success
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = () => {
    const newErrors = {};
    
    if (!formData.code) {
      newErrors.code = 'Verification code is required';
    } else if (formData.code !== '123456') {
      newErrors.code = 'Invalid verification code. Use: 123456';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = false;
    
    switch (step) {
      case 'email':
        isValid = validateEmail();
        break;
      case 'code':
        isValid = validateCode();
        break;
      case 'reset':
        isValid = validatePassword();
        break;
    }
    
    if (!isValid) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      switch (step) {
        case 'email': setStep('code');
          break;
        case 'code': setStep('reset');
          break;
        case 'reset': setStep('success');
          break;
      }
      setIsLoading(false);
    }, 1000);
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your email address"
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
        <p className="mt-2 text-sm text-text-secondary">
          We'll send you a verification code to reset your password.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending code...</span>
          </>
        ) : (
          <>
            <Icon name="Send" size={20} />
            <span>Send Reset Code</span>
          </>
        )}
      </button>
    </form>
  );

  const renderCodeStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-primary" />
        </div>
        <p className="text-text-secondary">
          We've sent a verification code to<br />
          <span className="font-medium text-text-primary">{formData.email}</span>
        </p>
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-text-primary mb-2">
          Verification Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth text-center text-lg tracking-widest ${
            errors.code ? 'border-error-500' : 'border-border'
          }`}
          placeholder="000000"
          maxLength="6"
        />
        {errors.code && (
          <p className="mt-1 text-sm text-error-500">{errors.code}</p>
        )}
        
        {/* Demo Code Info */}
        <div className="mt-3 p-3 bg-primary-50 border border-primary-100 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm text-primary font-medium">Demo Code</p>
              <p className="text-sm text-primary">Use verification code: 123456</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </>
        ) : (
          <>
            <Icon name="Check" size={20} />
            <span>Verify Code</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => setStep('email')}
        className="w-full text-sm text-text-secondary hover:text-text-primary transition-smooth"
      >
        Didn't receive the code? Try again
      </button>
    </form>
  );

  const renderResetStep = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-text-primary mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
              errors.newPassword ? 'border-error-500' : 'border-border'
            }`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-sm text-error-500">{errors.newPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm New Password
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
            placeholder="Confirm new password"
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Updating password...</span>
          </>
        ) : (
          <>
            <Icon name="Lock" size={20} />
            <span>Update Password</span>
          </>
        )}
      </button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Password Reset Successful
        </h3>
        <p className="text-text-secondary">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth"
      >
        <Icon name="ArrowLeft" size={20} />
        <span>Back to Sign In</span>
      </button>
    </div>
  );

  return (
    <div className="bg-surface rounded-xl shadow-card border border-border p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth mb-4"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Back to Sign In</span>
        </button>
        
        {step !== 'success' && (
          <>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {step === 'email' && 'Reset Password'}
              {step === 'code' && 'Enter Verification Code'}
              {step === 'reset' && 'Create New Password'}
            </h1>
            <p className="text-text-secondary">
              {step === 'email' && 'Enter your email address to receive a reset code'}
              {step === 'code' && 'Check your email for the verification code'}
              {step === 'reset' && 'Choose a strong password for your account'}
            </p>
          </>
        )}
      </div>

      {/* Content */}
      {step === 'email' && renderEmailStep()}
      {step === 'code' && renderCodeStep()}
      {step === 'reset' && renderResetStep()}
      {step === 'success' && renderSuccessStep()}
    </div>
  );
};

export default ForgotPassword;