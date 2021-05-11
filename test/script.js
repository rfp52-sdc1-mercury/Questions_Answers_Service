import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
  vus: 10000,
  duration: '30s'
}

let url = 'http://localhost:3001/qa/questions?product_id=17067&page=1&count=1'

export default function() {

  // GET route
  http.get('http://localhost:3001/qa/questions?product_id=1000003&page=1&count=1');
  // http.get('http://localhost:3001/qa/questions?product_id=17067&page=1&count=1');



  // POST route to questions

  // http.post(
  //   "http://localhost:3001/qa/questions",
  //   '{\n  "body": "Does this auto increment?",\n  "name": "megamanexe",\n  "email": "megamanexe@bellsouth.net",\n  "product_id": 17071\n}',
  //   {
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   }
  // );

    // POST route to questions


  sleep(1);
}