import { createClient } from 'microcms-js-sdk'; //ES6

require('dotenv').config();
const { API_KEY, SERVICE_ID } = process.env;

export const client = createClient({
  serviceDomain: SERVICE_ID,
  apiKey: API_KEY,
});