import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
// import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function DiabetesPrediction() {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);  // New state for loading

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when form is submitted
    setResult(null);   // Reset result before prediction

    // Simulate a delay for prediction (you can uncomment the axios part when ready)
    setTimeout(() => {
      setResult(0);  // Simulating a prediction result
      setLoading(false);  // Reset loading state after prediction
    }, 2000);
    
    // Uncomment when integrating with the backend
    // try {
    //   const response = await axios.post('http://localhost:5000/api/predict', formData);
    //   setResult(response.data.outcome);
    // } catch (error) {
    //   console.error('Error fetching prediction:', error);
    //   setLoading(false);  // Reset loading on error
    // }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url('https://images.unsplash.com/photo-1592336510563-13f825d6ad86')`,
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
          <Container maxWidth="sm" style={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom style={{ color: '#1976d2', fontWeight: 'bold' }}>
              Diabetes Prediction
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Object.keys(formData).map((key) => (
                <TextField
                  key={key}
                  name={key}
                  label={key}
                  variant="outlined"
                  value={formData[key]}
                  onChange={handleInputChange}
                  type="number"
                  fullWidth
                />
              ))}
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Predict
              </Button>
            </Box>
            {loading ? ( // Show CircularProgress while loading
              <CircularProgress sx={{ marginTop: 3 }} />
            ) : (
              result !== null && (
                <Typography
                  variant="h6"
                  sx={{ marginTop: 3, fontWeight: 'bold', color: result === 1 ? '#f50057' : '#4caf50' }}
                >
                  Prediction Result: {result === 1 ? 'Diabetic' : 'Non-Diabetic'}
                </Typography>
              )
            )}
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default DiabetesPrediction;

