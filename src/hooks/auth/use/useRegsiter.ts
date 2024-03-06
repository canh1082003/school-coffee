import { useMutation } from 'react-query';
import { REGISTER_QUERY, REGISTER_URL } from './constant';
import { RegisterFormData } from '../../../views/auth/pages/RegsterForm';
import api from '../../../api/Api';
export interface RegisterDto extends RegisterFormData {
  role: string;
}
const register = (user: RegisterDto) => {
  return api.post(REGISTER_URL, user);
};

export const useRegister = () => {
  return useMutation([REGISTER_QUERY], (user: RegisterDto) => register(user));
};
