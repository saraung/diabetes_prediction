import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

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
  const [loading, setLoading] = useState(false);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when form is submitted
    setResult(null);   // Reset result before prediction
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${backendUrl}/predict`, {
            Pregnancies: parseFloat(formData.Pregnancies),
            Glucose: parseFloat(formData.Glucose),
            BloodPressure: parseFloat(formData.BloodPressure),
            SkinThickness: parseFloat(formData.SkinThickness),
            Insulin: parseFloat(formData.Insulin),
            BMI: parseFloat(formData.BMI),
            DiabetesPedigreeFunction: parseFloat(formData.DiabetesPedigreeFunction),
            Age: parseFloat(formData.Age),
        }
      );
      setResult(response.data.prediction);
    } catch (error) {
      if (error.response) {
          if (error.response.status === 400) {
              toast.error(error.response.data.error);
          } else {
              toast.error('An unexpected error occurred. Please try again later.');
          }
      } else {
          toast.error('Network error. Please check your connection.');
      }
  } finally {
      setLoading(false);
  }
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
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
            {loading ? ( 
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
