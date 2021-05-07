const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'data', 'questions.csv');

// let filePath = path.join(datapath, 'questions.csv')

fsPromises.readFile(dataDir)
.then((data) => {
  console.log(data.toString());
})