import axios from 'axios';

export const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
});
