import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Eye, EyeOff, Check } from 'lucide-react';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    adhdType: '',
    agreeToTerms: false,
  });

  const adhdTypes = [
    { value: 'inattentive', label: 'Primarily Inattentive' },
    { value: 'hyperactive', label: 'Primarily Hyperactive-Impulsive' },
    { value: 'combined', label: 'Combined Type' },
    { value: 'not-diagnosed', label: 'Not Diagnosed / Exploring' },
    { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-background to-accent-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-2xl mb-4">
            <Brain className="w-8 h-8 text-secondary-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Join Our Community
          </h1>
          <p className="text-gray-600">
            Create your account and find your support network
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="adhdType" className="block text-sm font-medium text-gray-700 mb-2">
                ADHD Type <span className="text-gray-400">(Optional)</span>
              </label>
              <select
                id="adhdType"
                value={formData.adhdType}
                onChange={(e) => setFormData({ ...formData, adhdType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
              >
                <option value="">Select if you'd like to share</option>
                {adhdTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This helps us personalize your experience and is never required
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="rounded border-gray-300 text-secondary-600 focus:ring-secondary-500"
                  required
                />
              </div>
              <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="text-secondary-600 hover:text-secondary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-secondary-600 hover:text-secondary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="w-full bg-secondary-500 text-white py-3 px-4 rounded-xl hover:bg-secondary-600 transition-colors font-medium focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-secondary-600 hover:text-secondary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Community Benefits */}
        <div className="mt-6 bg-white/50 rounded-2xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">What you'll get:</h3>
          <div className="space-y-2">
            {[
              'Connect with understanding community members',
              'Share experiences in a judgment-free space',
              'Access ADHD-friendly resources and tips',
              'Participate in supportive discussions',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-accent-600" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}