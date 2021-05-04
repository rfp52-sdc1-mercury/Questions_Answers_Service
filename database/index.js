const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qna', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('Error connecting to MongoDB', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB!');
})

let photoSchema = mongoose.Schema({
  url: String
})

let Photo = mongoose.model('Photo', photoSchema);

let answerSchema = mongoose.Schema({
  body: String,
  date: Date,
  name: String,
  email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [photoSchema]
})

let Answer = mongoose.model('Answer', answerSchema);

let questionSchema = mongoose.Schema({
  body: String,
  date: Date,
  name: String,
  email: String,
  helpfulness: Number,
  reported: Boolean,
  answers: [answerSchema]
})

let Question = mongoose.model('Question', questionSchema);

let productSchema = mongoose.Schema({
  product_id: Number,
  questions: [questionSchema]
});

let Product = mongoose.model('Product', productSchema);

let testPhoto = new Photo({url: 'doesntmatter'});
let testAnswer = new Answer({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false})
let testQuestion = new Question({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false})
let testProduct = new Product({product_id: '42069'});

testAnswer.photos.push(testPhoto);
testQuestion.answers.push(testAnswer);
testProduct.questions.push(testQuestion);
// testProduct.save();


// testProduct.questions.answers.push({body: 'test', name: 'test', email: 'test@test.com', helpfulness: 0, reported: false});
// testProduct.save();
// testProduct.questions.answers.photos.push({url: 'fakeurl'});
// testProduct.save();

