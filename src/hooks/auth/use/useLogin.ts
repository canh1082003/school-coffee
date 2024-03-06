import { useMutation } from 'react-query';
import { LOGIN_QUERY, LOGIN_URL } from './constant';
import api from '../../../api/Api';
import { LoginFormData } from '../../../views/auth/pages/LoginForm';

const login = (user: LoginFormData) => {
  return api.post(LOGIN_URL, user);
};

export const useLogin = () => {
  return useMutation([LOGIN_QUERY], (user: LoginFormData) => login(user));
};
