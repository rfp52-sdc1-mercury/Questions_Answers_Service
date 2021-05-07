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

app.post('/qa/questions', function(req, res) {
  var {body, name, email, product_id} = req.body
  console.log(body, name, email, product_id);

  if (product_id == undefined) {
    res.sendStatus(400);
  }
  // res.end();
  db.Question.create({body: body, asker_name: name, asker_email: email, product_id: product_id, date_written: new Date(), helpful: 0, reported: false})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.put('/qa/questions/:question_id/helpful', function(req, res) {
  var {question_id} = req.params;
  console.log(question_id);


  // res.sendStatus(204);
  db.Question.updateOne({id: question_id}, {$inc: {helpful: 1}})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

let port = 3000;
app.listen(port, function() {
  console.log(`now listening on port ${port}`);
})