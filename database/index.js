// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const url = 'mongodb://localhost';

// const dbName = 'qna';
// const client = new MongoClient(url);

// // client.connect(function(err) {
// //   assert.equal(null, err);
// //   console.log('Connected successfully to server');

// //   const db = client.db(dbName);

// //   let collection = db.collection('questions_answers_aggregated');

// //   collection.find({product_id: 17071}).toArray(function(err, docs) {
// //     assert.equal(err, null);
// //     console.log('Found the following records');
// //     console.log(docs);

// //   })
// // })

// module.exports = client;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qna', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('Error connecting to MongoDB', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB!');
})

let photoSchema = mongoose.Schema({
  id: Number,
  answer_id: Number,
  url: String
})

let Photo = mongoose.model('Photo', photoSchema);

let answerSchema = mongoose.Schema({
  id: Number,
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  helpful: Number,
  reported: Boolean,
  photos: [photoSchema]
})

let Answer = mongoose.model('Answer', answerSchema);

let questionSchema = mongoose.Schema({
  id: Number,
  product_id: {type: Number, required: true},
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  helpful: Number,
  reported: Boolean,
  answers: [answerSchema]
})

let Question = mongoose.model('Question', questionSchema, 'questions_answers_aggregated');

let counterSchema = mongoose.Schema({
  _id: String,
  sequence_value: Number
})

let Counter = mongoose.model('Counter', counterSchema, 'counters');

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.Photo = Photo;
module.exports.Counter = Counter;

// let productSchema = mongoose.Schema({
//   product_id: Number,
//   questions: [questionSchema]
// });

// let Product = mongoose.model('Product', productSchema);

// let testPhoto = new Photo({url: 'doesntmatter'});
// let testAnswer = new Answer({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false})
// let testQuestion = new Question({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false})
// let testProduct = new Product({product_id: '42069'});

// testAnswer.photos.push(testPhoto);
// testQuestion.answers.push(testAnswer);
// testProduct.questions.push(testQuestion);

// testProduct.save();


// testProduct.questions.answers.push({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false});
// testProduct.save();
// testProduct.questions.answers.photos.push({url: 'fakeurl'});
// testProduct.save();

