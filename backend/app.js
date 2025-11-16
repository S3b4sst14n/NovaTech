// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// Configura CORS según tu front
app.use(cors({
  origin: 'http://localhost:5500', // Cambia por la URL del front
  credentials: true
}));

app.use('/api/auth', authRoutes);

// Ruta protegida de ejemplo
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Ruta protegida OK', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
