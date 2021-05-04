const express = require('express');
const db = require('../database');
let app = express();

// app.use(express.static('FILEPATHGOESHERE'));
app.use(express.json());

let port = 3000;
app.listen(port, function() {
  console.log(`now listening on port ${port}`);
})