import { useMutation } from 'react-query';
import api from '../../../api/Api';
import { VERIFY_QUERY, VERIFY_URL } from './constant';

const verifyEmail = (verifyEmailToken: string) => {
  return api.post(VERIFY_URL, { verifyEmailToken });
};

export const useVerifyEmail = () => {
  return useMutation([VERIFY_QUERY], (verifyEmailToken: string) => verifyEmail(verifyEmailToken));
};
