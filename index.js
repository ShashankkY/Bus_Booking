const express = require('express');
const db = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send("Hello World"));

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

db.sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("🚀 Server is running on http://localhost:3000");
    });
  })
  .catch(err => console.log("❌ DB Sync Error:", err));





// const express = require('express');
// const app = express();
// const port = 3000;

// const userRoutes = require('./routes/userRoutes');
// const busRoutes = require('./routes/busRoutes');

// app.use(express.json());

// app.use('/users', userRoutes);
// app.use('/buses', busRoutes);

// app.listen(3000, () => console.log('Server running on port 3000'));
