import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const handleSocialLogin = (provider) => {
    setLoadingProvider(provider.name);
    
    // Simulate social login
    setTimeout(() => {
      onSuccess();
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="mt-8">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      {/* <div className="mt-6 grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialLogin(provider)}
            disabled={loadingProvider === provider.name}
            className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border rounded-lg transition-smooth ${provider.borderColor} ${provider.bgColor} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loadingProvider === provider.name ? (
              <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Icon name={provider.icon} size={20} className={provider.color} />
            )}
            <span className="text-text-primary font-medium">
              {loadingProvider === provider.name ? 'Connecting...' : `Continue with ${provider.name}`}
            </span>
          </button>
        ))}
      </div> */}

      {/* Alternative: Compact Social Buttons */}
      <div className="mt-4 hidden sm:block">
        <div className="grid grid-cols-3 gap-3">
          {socialProviders.map((provider) => (
            <button
              key={`compact-${provider.name}`}
              onClick={() => handleSocialLogin(provider)}
              disabled={loadingProvider === provider.name}
              className={`flex items-center justify-center p-3 border rounded-lg transition-smooth ${provider.borderColor} ${provider.bgColor} disabled:opacity-50 disabled:cursor-not-allowed`}
              title={`Continue with ${provider.name}`}
            >
              {loadingProvider === provider.name ? (
                <div className="w-5 h-5 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name={provider.icon} size={20} className={provider.color} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;