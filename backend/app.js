require('dotenv').config();

const express = require('express');
const app = express();
const lib = require('pipedrive');

const PORT = 5000;

lib.Configuration.apiToken = process.env.API_TOKEN;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
      
app.get('/', async (req, res) => {
    const user = await lib.UsersController.getCurrentUserData();
    res.send(user);
});