import axios, { AxiosInstance } from 'axios';

export class ProductApi {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'localhost:4000/api/coffee',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
const ApiProduct = new ProductApi().instance;
export default ApiProduct;
