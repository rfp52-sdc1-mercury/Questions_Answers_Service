const express = require('express');
const db = require('../database');
let app = express();

const assert = require('assert');
const dbName = 'qna';

// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);

//   let collection = db.collection('questions_answers_aggregated');

//   collection.find({product_id: 17071}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log('Found the following records');
//     console.log(docs);

//   })
// })

// app.use(express.static('FILEPATHGOESHERE'));
app.use(express.json());

app.get('/qa/questions', function(req, res) {

  // console.log(req.query.product_id, req.query.page, req.query.count);
  db.Question.find({product_id: req.query.product_id})
  .then((results) => {
    // console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  })

});

app.get('/qa/questions/:question_id/answers', function(req, res) {
  console.log(req.params.question_id);
  // res.end();
  db.Question.find({id: req.params.question_id})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  })
});

let port = 3000;
app.listen(port, function() {
  console.log(`now listening on port ${port}`);
})