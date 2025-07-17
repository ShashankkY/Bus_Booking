// app.js
const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingrouter');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', busRoutes);
app.use('/api', bookingRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Import models to ensure associations are loaded
    require('./models/associations');
    
    // Sync database
    await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
    console.log('✅ Database synchronized successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
})();








// const express = require('express');
// const app = express();
// const port = 3000;

// const userRoutes = require('./routes/userRoutes');
// const busRoutes = require('./routes/busRoutes');

// app.use(express.json());

// app.use('/users', userRoutes);
// app.use('/buses', busRoutes);

// app.listen(3000, () => console.log('Server running on port 3000'));
