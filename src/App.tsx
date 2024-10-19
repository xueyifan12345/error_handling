import React, {useState} from 'react';
import { Container, Grid } from '@mui/material';
import CardComponent from './CardComponent';

const App: React.FC = () => {
  const [check, setCheck] = useState(false)
  const handleCheck = () => {
    setCheck(!check)
  }
  return (
    <Container>
      <Grid container spacing={2}>
        {[1, 2].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardComponent id={index} check={handleCheck}/>
          </Grid>
        ))}
        {[3,4,5].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardComponent id={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
