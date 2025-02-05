import axios from 'axios';

export const api = axios.create({
  baseURL: `/api`,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const whatsappApi = axios.create({
  baseURL: process.env.WHATSAPP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.WHATSAPP_API_KEY,    
  }
});