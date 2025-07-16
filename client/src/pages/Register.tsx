
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const [confirmDirty, setConfirmDirty] = useState(false);

  const passwordValid = (password: string) => {
    // At least 6 chars, 1 capital, 1 lowercase, 1 number, 1 symbol
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(password);
  };

  const passwordsMatch = form.password === form.confirmPassword && form.confirmPassword.length > 0;
  const isPasswordValid = passwordValid(form.password);
  const canRegister = form.username && isPasswordValid && passwordsMatch;

  // Show error if confirm field is dirty and doesn't match
  const showConfirmError = confirmDirty && !passwordsMatch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' && !confirmDirty) {
      setConfirmDirty(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canRegister) return;
    // TODO: Replace with your API endpoint
    const res = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.username, password: form.password }),
    });
    const data = await res.json();
    setMessage(data.message || 'Registered!');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={2} align="center">Register</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={form.password.length > 0 && !isPasswordValid}
            helperText={
              form.password.length > 0 && !isPasswordValid
                ? 'At least 6 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol'
                : 'Password must be at least 6 characters and include an uppercase letter, a lowercase letter, a number, and a special character.'
            }
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            error={confirmDirty && !passwordsMatch}
            color={passwordsMatch && confirmDirty ? 'success' : confirmDirty && !passwordsMatch ? 'error' : 'primary'}
            helperText={
              confirmDirty && !passwordsMatch
                ? 'Passwords do not match.'
                : passwordsMatch && confirmDirty
                ? 'Passwords match!'
                : 'Repeat your password.'
            }
            FormHelperTextProps={{
              style: passwordsMatch && confirmDirty
                ? { color: 'green' }
                : confirmDirty && !passwordsMatch
                ? { color: 'red' }
                : {},
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }} disabled={!canRegister}>
            Register
          </Button>
        </Box>
        <Button component={Link} to="/login" variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
          Back to Login
        </Button>
        {message && <Typography color="success.main" align="center" mt={2}>{message}</Typography>}
      </Paper>
    </Box>
  );
}

export default Register;
