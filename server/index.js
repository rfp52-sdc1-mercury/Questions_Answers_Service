const express = require('express');
const db = require('../database');
let app = express();
const path = require('path');

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

app.use(express.static(__dirname + '/../../Project-Catwalk-1/client/dist'));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.get('/qa/questions', function(req, res) {

  // console.log(req.query.product_id, req.query.page, req.query.count);
  db.Question.find({product_id: req.query.product_id})
  .then((results) => {
    // console.log(results);
    var resultsModified = results.map((question) => {
      var answersModified = question.answers.map((answer) => {
        var answerModified =
        {
          id: answer.id,
          body: answer.body,
          date: answer.date_written,
          answerer_name: answer.answerer_name,
          answerer_email: answer.answerer_email,
          reported: answer.reported,
          helpfulness: answer.helpful,
          photos: answer.photos
        }
        // answer;

        // answerModified.date = answer.date_written;
        // answerModified.helpfulness = answer.helpful;

        // console.log(answerModified.date);
        // console.log(answerModified.helpfulness);

        return answerModified;
      });
      console.log(answersModified);

      var questionModified = {
        question_id: question.id,
        question_body: question.body,
        question_date: question.date_written,
        asker_email: question.asker_email,
        asker_name: question.asker_name,
        question_helpfulness: question.helpful,
        question_reported: question.reported,
        answers: answersModified
      }
      return questionModified;
    })
    var output = {product_id: req.query.product_id, results: resultsModified}
    res.json(output);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  })

});

app.get('/qa/questions/:question_id/answers', function(req, res) {

  // console.log(req.query.product_id, req.query.page, req.query.count);
  db.Question.findOne({id: req.params.question_id})
  .then((results) => {
    // console.log(results);
    var output = {question: req.params.question_id, count: req.query.count, page: req.query.page, results: results.answers}
    res.json(output);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(404);
  })

});

app.post('/qa/questions', function(req, res) {
  var {body, name, email, product_id} = req.body
  // console.log(body, name, email, product_id);

  if (product_id == undefined) {
    res.sendStatus(400);
  }
  // res.end();


  db.Counter.findOneAndUpdate({'_id': 'question_id'}, {'$inc': {sequence_value: 1}}, {new: true})
  .then((results) => {
  console.log(results.sequence_value);
  //res.json(results);

  db.Question.create({id: results.sequence_value, body: body, asker_name: name, asker_email: email, product_id: product_id, date_written: new Date(), helpful: 0, reported: 0})
  .then((results) => {
    // console.log(results);
    res.json(results);
  })
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.post('/qa/questions/:question_id/answers', function(req, res) {
  var {body, name, email, photos} = req.body
  console.log(body, name, email, photos);
  var {question_id} = req.params;
  // console.log(question_id);

  if (question_id == undefined) {
    res.sendStatus(400);
  }

  // res.end();

  db.Question.findOne({id: question_id})
  .then((results) => {
    // console.log(results);
    // res.json(results.answers);
    if (results == null) {
      throw error;
    }

    // Create our new answer

    db.Counter.findOneAndUpdate({'_id': 'answer_id'}, {'$inc': {sequence_value: 1}}, {new: true})
    .then((id) => {
      console.log(id.sequence_value);



      var ans = new db.Answer({id: id.sequence_value, body: body, answerer_name: name, answerer_email: email, question_id: question_id, date_written: new Date(), helpful: 0, reported: 0})

      // console.log(results);
      results.answers.push(ans);
      results.save();
      res.json(results);
      })
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

app.put('/qa/answers/:answer_id/helpful', function(req, res) {
  var {answer_id} = req.params;
  console.log(answer_id);


  // res.sendStatus(204);
  db.Question.updateOne({'answers.id': answer_id}, {$inc: {'answers.$.helpful': 1}})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.put('/qa/questions/:question_id/report', function(req, res) {
  var {question_id} = req.params;
  console.log(question_id);


  // res.sendStatus(204);
  db.Question.updateOne({id: question_id}, {reported: 1})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.put('/qa/answers/:answer_id/report', function(req, res) {
  var {answer_id} = req.params;
  console.log(answer_id);


  // res.sendStatus(204);
  db.Question.updateOne({'answers.id': answer_id}, {'answers.$.reported': 0})
  .then((results) => {
    console.log(results);
    res.json(results);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

let port = 3001;
app.listen(port, function() {
  console.log(`now listening on port ${port}`);
})