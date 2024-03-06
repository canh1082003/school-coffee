/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions } from 'react-hook-form';

type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'fullName'
    | 'address'
    | 'firstName'
    | 'lastName']: RegisterOptions;
};

export const getRule = (): Rules => ({
  firstName: {
    required: { value: true, message: 'obliges' }
  },
  lastName: {
    required: { value: true, message: 'obliges' }
  },
  email: {
    required: { value: true, message: 'obliges' },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email is not in the correct format'
    }
  },

  password: {
    required: { value: true, message: 'obliges' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
      message: 'Weak password'
    },
    maxLength: {
      value: 160,
      message: 'Length from 6- 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Length from 6- 160 characters'
    }
  },
  confirmPassword: {
    required: { value: true, message: 'This field is required' }
  },
  fullName: {
    required: { value: true, message: 'bắt buộc' }
  },
  address: {
    required: { value: true, message: 'bắt buộc' }
  }
});
