import axios, { AxiosError, AxiosInstance } from 'axios';
import config from './config';
import { LOGIN_URL, REGISTER_URL, VERIFY_URL } from '../hooks/auth/use/constant';
import { LoginData, RegisterData } from '../hooks/auth/use/type';
import { ApiSuccessResponse } from '../hooks/type';
import { toast } from 'react-toastify';

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
    this.instance.interceptors.response.use(
      response => {
        const { url } = response.config;
        switch (url) {
          case REGISTER_URL: {
            const registerResponse = response as ApiSuccessResponse<RegisterData>;
            const email = registerResponse;
            if (url == REGISTER_URL) {
              window.location.href = '/confirmEmail/' + email;
            }
            return response;
          }
          case VERIFY_URL: {
            toast.success('Verify successfully');
            setTimeout(() => {
              window.location.href = '/auth';
            }, 6000);
            return response;
          }
          case LOGIN_URL: {
            const LoginResponse = response as ApiSuccessResponse<LoginData>;
            const userInfo = LoginResponse.data.data;
            console.log(userInfo);
            if (!userInfo.isVerifyEmail) {
              window.location.href = '/confirmEmail/' + userInfo.email;
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            if (userInfo.role === 'admin') window.location.href = '/home/admin';
            else if (userInfo.role === 'user') {
              window.location.href = '/home/user';
            } else {
              window.location.href = '/home/shipper';
            }
            return response;
          }

          default: {
            return response;
          }
        }
      },
      (error: AxiosError) => {
        const data: any = error.response?.data;
        if (error.status !== 401) {
          toast.error(data.errors.errorMessage);
        }
      }
    );
  }
}
const api = new Api().instance;
export default api;
