import axios from 'axios';


const baseUrl = 'http://api.alquran.cloud/v1/juz/';

const apiJuz = axios.create({
  baseURL: baseUrl,
  
});

export default apiJuz;
