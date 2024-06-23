// main.js

import { runQuery } from './searchAndQuery.js';

const queryQues = 'Generate code to Fetch Data Asynchronously from an API in Javascript'; // Replace with your query

runQuery(queryQues).then(answer => console.log('Answer:', answer)).catch(err => console.error('Error:', err));
