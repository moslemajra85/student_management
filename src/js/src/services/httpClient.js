import axios, { CanceledError } from 'axios';

export { CanceledError };
const httpClient = axios.create({
  baseURL: 'http://localhost:8080/api',
 
});
export default httpClient;
