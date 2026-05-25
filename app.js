require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/api/books', bookRoutes);
// Users
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Root route — health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Bookstore API is running' });
});

// 404 handler — unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });