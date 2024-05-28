const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://yeruva_ydm:OwhtNjVIKtYZnY68@atlascluster.zjyibid.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const propertyRoutes = require('./propertyApi');
const userRoutes = require('./userRoute');
app.use('/api/users', userRoutes);
app.use('/api', propertyRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
