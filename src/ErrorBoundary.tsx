import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Typography, Box } from '@mui/material';

interface Props {
  children: ReactNode;
  onRetry: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Error details:', error, errorInfo);
  }
  
  render() {
    console.log(this.state.hasError)
    if (this.state.hasError) {
      return (
        <Box>
          {this.props.children}
          <Typography color="error" sx={{ mt: 2 }}>Error: {this.state.error?.message}</Typography>
          <Button onClick={this.props.onRetry} variant="contained" color="primary" sx={{ mt: 1 }}>
            Retry
          </Button>
        </Box>
      );
    }else{
        return this.props.children;        
    }
  }
}

export default ErrorBoundary;
