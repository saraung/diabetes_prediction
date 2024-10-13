import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI.toFixed(2));
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        BMI Calculator
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Weight (kg)"
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
          fullWidth
        />
        <TextField
          label="Height (cm)"
          variant="outlined"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          type="number"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={calculateBMI}
          sx={{ fontWeight: 'bold', mt: 2 }}
        >
          Calculate BMI
        </Button>
      </Box>
      {bmi && (
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', color: 'secondary.main' }}>
          Your BMI is: {bmi}
        </Typography>
      )}
    </Paper>
  );
};

export default BMICalculator;
