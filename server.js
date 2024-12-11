const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/restapidb';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);

// Lắng nghe server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
