require('dotenv').config();

const PORT = 5000;
const express = require('express');
const app = express();
const lib = require('pipedrive');
const personsRouter = require('./routes/personsRouter');
const organizationsRouter = require('./routes/organizationsRouter');

app.use(express.json());

app.use('/persons', personsRouter);
app.use('/organizations', organizationsRouter);

lib.Configuration.apiToken = process.env.API_TOKEN;
      
app.get('/', async (req, res) => {
    const user = await lib.UsersController.getCurrentUserData();
    res.send(user);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});