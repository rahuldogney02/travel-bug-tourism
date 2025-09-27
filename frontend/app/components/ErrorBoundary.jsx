'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-dark mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand/80 transition-colors focus-brand"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}