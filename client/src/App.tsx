

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, IconButton, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';




function MainLogin() {
  const [form, setForm] = React.useState({ username: '', password: '' });
  const [message, setMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your API endpoint
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || 'Logged in!');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={2} align="center">Login</Typography>
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
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }}>
            Login
          </Button>
        </Box>
        <Button component={Link} to="/register" variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
          Register
        </Button>
        {message && <Typography color="success.main" align="center" mt={2}>{message}</Typography>}
      </Paper>
    </Box>
  );
}

function useSystemTheme() {
  const getPref = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [mode, setMode] = React.useState(getPref());
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return [mode, setMode] as const;
}

function App() {
  const [systemMode, setSystemMode] = useSystemTheme();
  const [mode, setMode] = React.useState<'light' | 'dark'>(systemMode as 'light' | 'dark');

  React.useEffect(() => {
    setMode(systemMode as 'light' | 'dark');
  }, [systemMode]);

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const toggleTheme = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box position="fixed" top={8} right={8} zIndex={9999}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<MainLogin />} />
          <Route path="/" element={<MainLogin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
