import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import ForgotPassword from './components/ForgotPassword';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulAuth = () => {
    navigate('/homepage');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {showForgotPassword ? (
            <ForgotPassword onBack={() => setShowForgotPassword(false)} />
          ) : (
            <div className="bg-surface rounded-xl shadow-card border border-border p-8">
              {/* Tab Navigation */}
              <div className="flex mb-8 bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === 'login' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-smooth ${
                    activeTab === 'register' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Welcome Message */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {activeTab === 'login' ? 'Welcome back!' : 'Create your account'}
                </h1>
                <p className="text-text-secondary">
                  {activeTab === 'login' ?'Sign in to manage your events and connect with attendees' :'Join thousands of event organizers using EventHub'
                  }
                </p>
              </div>

              {/* Forms */}
              {activeTab === 'login' ? (
                <LoginForm
                  onSuccess={handleSuccessfulAuth}
                  onForgotPassword={() => setShowForgotPassword(true)}
                />
              ) : (
                <RegisterForm onSuccess={handleSuccessfulAuth} />
              )}

              {/* Social Login */}
              <SocialLogin onSuccess={handleSuccessfulAuth} />

              {/* Footer Links */}
              <div className="mt-8 text-center">
                <p className="text-sm text-text-secondary">
                  By continuing, you agree to our{' '}
                  <Link to="#" className="text-primary hover:text-primary-700 transition-smooth">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="#" className="text-primary hover:text-primary-700 transition-smooth">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginRegister;