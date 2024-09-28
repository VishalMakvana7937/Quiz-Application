require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const router = require('./routes/quizRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/quizzes', router);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to the database', err);
});

module.exports = app;
