import http from 'k6/http';
import {sleep} from 'k6';

export let options = {
  vus: 10,
  duration: '30s'
}

let url = 'http://localhost:3001/qa/questions?product_id=17067&page=1&count=1'

export default function() {
  http.get('http://localhost:3001/qa/questions?product_id=17067&page=1&count=1');
  sleep(1);
}