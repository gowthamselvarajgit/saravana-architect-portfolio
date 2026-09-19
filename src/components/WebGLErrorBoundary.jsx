import React, { Component } from 'react';

/**
 * WebGLErrorBoundary
 * Catches WebGL initialization failures, context losses, and rendering errors
 * to ensure that failure of a WebGL context never crashes the React application.
 */
export default class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGLErrorBoundary caught WebGL context failure:', error?.message || error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className={`webgl-fallback-container ${this.props.className || ''}`}>
          {this.props.childrenFallback || null}
        </div>
      );
    }
    return this.props.children;
  }
}
