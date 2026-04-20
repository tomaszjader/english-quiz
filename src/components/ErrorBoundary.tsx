import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('React Error Boundary caught:', error);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-surface to-surface-container p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-3xl text-error">warning</span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface">Coś poszło nie tak</h1>
              <p className="text-on-surface-variant text-sm">Przepraszamy, aplikacja napotkała nieoczekiwany błąd.</p>
            </div>

            {this.state.error && (
              <div className="bg-error-container/20 border border-error/30 rounded-lg p-3 text-left">
                <p className="text-xs font-mono text-error break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full px-4 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Odśwież stronę
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
