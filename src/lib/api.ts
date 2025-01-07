import axios from 'axios';

// on .env file, exists a variable called API_LINK, that is the link to the API


export const api = axios.create({
  baseURL: `/api`,
});