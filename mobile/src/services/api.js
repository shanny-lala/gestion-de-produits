import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// For physical devices or Expo Go, dynamically get the host machine IP
const debuggerHost = Constants.expoConfig?.hostUri;
const localhost = debuggerHost?.split(':')[0] || (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

const BASE_URL = `http://${localhost}:3000/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const response = await api.get('/produits');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/produits/${id}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post('/produits', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/produits/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/produits/${id}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/produits/stats');
  return response.data;
};

export default api;
