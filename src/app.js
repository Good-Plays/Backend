const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB Atlas
const mongoUri = 'mongodb+srv://goodplays:WdwxLWvV2QUBCItv@cluster0.j5wsuib.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Start setting up the Express app after successfully connecting to MongoDB
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');

    app.use('/user', userRoutes);
    app.use('/user', authRoutes);

    const PORT = 3000; // Port number you're using
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });



//   const igdbService = require('./services/igdbService'); 

//   async function testIgdbService() {
//     try {
//       query = 'fields: *;'
//       const data = await igdbService.fetchData(query);
//       console.log(data);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//     }
//   }
  
//   testIgdbService();