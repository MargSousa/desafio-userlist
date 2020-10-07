require('dotenv').config();

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, response) => {
  const url = `http://${process.env.COMPANY_DOMAIN}.pipedrive.com/api/v1/organizations?api_token=${process.env.API_TOKEN}`;
  axios.get(url).then(res => {
    response.send(res.data);
  })
  .catch(err => response.status(500).send('Error retrieving organizations'))
})

module.exports = router;