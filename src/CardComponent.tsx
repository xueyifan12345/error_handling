import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

interface CardProps {
  id: number;
  check?: () => void;
}

const CardComponent: React.FC<CardProps> = ({ id, check }) => {
  const [mockData, setMockData] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  console.log(`Rendering Card ${id}`);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    if(check){
        check();
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (Math.random() < 0.5) {
        throw new Error(`API ${id} call failed`);
      }
      const data = Math.floor(Math.random() * 99) + 1;
      setMockData(data);
      console.log(`Card ${id} data fetched successfully:`, data);
    } catch (error) {
      console.error(`Card ${id} data fetch failed:`, error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Card {id}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <>
            <Typography color="error" gutterBottom>
              Error: {error.message}
            </Typography>
            <Button onClick={handleRefresh} variant="contained" color="primary" size="small">
              Retry
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Data: {mockData}
            </Typography>
            <Button onClick={handleRefresh} variant="contained" color="primary" size="small">
              Refresh Data
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CardComponent;
