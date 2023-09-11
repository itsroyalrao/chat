require('dotenv').config();
const express = require('express');
const { join } = require('node:path');
const connectDB = require('./db/connect');
const authRoute = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: "*",
}));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'html', 'signup.html'));
})

app.use('/auth', authRoute);

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(3000, () => console.log('APP is listening at http://localhost:3000'));
})();