/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from 'axios';
import config from './config';
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from '../hooks/auth/use/constant';
import { RegisterFormData } from '../views/auth/pages/RegsterForm';
import { LoginData, RegisterData } from '../hooks/auth/use/type';
import { ApiSuccessResponse } from '../hooks/type';

export class Api {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${config.baseUrl}/api/coffee`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.instance.interceptors.response.use(response => {
      const { url } = response.config;
      switch (url) {
        case REGISTER_URL: {
          if (url == REGISTER_URL) {
            window.location.href = '/auth';
          }
          return response;
        }
        case LOGIN_URL: {
          const LoginResponse = response as ApiSuccessResponse<LoginData>;
          const userInfo = LoginResponse.data.data;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          if (userInfo.role === 'admin') window.location.href = '/home/admin';
          else {
            window.location.href = '/home/user';
          }
          return response;
        }

        default: {
          return response;
        }
      }
    });
  }
}
const api = new Api().instance;
export default api;
