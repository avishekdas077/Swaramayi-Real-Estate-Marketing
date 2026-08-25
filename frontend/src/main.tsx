import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#0b0f19', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ background: '#1e293b', border: '2px solid #ef4444', borderRadius: '16px', padding: '32px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)' }}>
            <h2 style={{ color: '#ef4444', fontSize: '1.4rem', fontWeight: '900' }}>⚠️ CRM WORKSPACE SYSTEM RECOVERY</h2>
            <p style={{ color: '#94a3b8', marginTop: '10px', fontSize: '0.88rem' }}>
              An unexpected render error occurred in the browser workspace.
            </p>
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', marginTop: '16px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#fbbf24', textAlign: 'left', overflowX: 'auto' }}>
              {this.state.error?.toString() || 'Unknown Error'}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}
              >
                🗑️ Reset Clean Local Storage & Reload
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}
              >
                🔄 Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
