import axios from 'axios';

// on .env file, exists a variable called API_LINK, that is the link to the API

const API_LINK = process.env.API_LINK;

export const api = axios.create({
  baseURL: `${API_LINK}/api`,
});