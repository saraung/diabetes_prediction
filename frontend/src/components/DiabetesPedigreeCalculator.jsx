import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, IconButton, Snackbar, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const DiabetesPedigreeCalculator = () => {
  const [relatives, setRelatives] = useState([{ ageOfOnset: '' }]); // Initialize with one relative
  const [diabetesScore, setDiabetesScore] = useState(null);
  const [removedRelative, setRemovedRelative] = useState(null); // Store the removed relative
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Control for the undo snackbar

  const handleRelativeChange = (index, value) => {
    const updatedRelatives = [...relatives];
    updatedRelatives[index].ageOfOnset = value;
    setRelatives(updatedRelatives);
  };

  const addRelative = () => {
    setRelatives([...relatives, { ageOfOnset: '' }]); // Add new relative with an empty ageOfOnset field
  };

  const removeRelative = (index) => {
    const updatedRelatives = [...relatives];
    const removed = updatedRelatives.splice(index, 1)[0]; // Remove the relative at the given index and store it
    setRelatives(updatedRelatives);
    setRemovedRelative(removed); // Store the removed relative
    setSnackbarOpen(true); // Show the undo option
  };

  const undoRemove = () => {
    if (removedRelative) {
      setRelatives([...relatives, removedRelative]); // Add the removed relative back to the list
      setRemovedRelative(null); // Clear the removed relative
    }
    setSnackbarOpen(false); // Close the snackbar
  };

  const calculateDiabetesScore = () => {
    let score = 0;
    relatives.forEach((relative) => {
      if (relative.ageOfOnset) {
        score += (100 - relative.ageOfOnset) * 0.01; // Sample scoring logic
      }
    });
    setDiabetesScore(score.toFixed(2));
  };

  return (
    <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Diabetes Pedigree Function Calculator
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {relatives.map((relative, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label={`Relative ${index + 1} Age of Onset`}
              variant="outlined"
              type="number"
              value={relative.ageOfOnset}
              onChange={(e) => handleRelativeChange(index, e.target.value)}
              fullWidth
            />
            <IconButton
              color="secondary"
              onClick={() => removeRelative(index)}
              sx={{ alignSelf: 'center' }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <IconButton
          color="primary"
          onClick={addRelative}
          sx={{ alignSelf: 'center', mt: 2 }}
        >
          <AddCircleOutlineIcon /> Add Another Relative
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateDiabetesScore}
          sx={{ mt: 2 }}
        >
          Calculate Score
        </Button>
        {diabetesScore && (
          <Typography
            variant="h6"
            sx={{ mt: 3, fontWeight: 'bold', color: 'secondary.main' }}
          >
            Your Diabetes Pedigree Function Score is: {diabetesScore}
          </Typography>
        )}
      </Box>

      {/* Snackbar for undo option */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        message="Relative removed"
        action={
          <Button color="secondary" size="small" onClick={undoRemove}>
            UNDO
          </Button>
        }
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          Relative removed. <Button color="inherit" onClick={undoRemove}>UNDO</Button>
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default DiabetesPedigreeCalculator;
