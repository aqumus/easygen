import { z } from 'zod';
import { AuthResponse, User } from '@/types';
  
import { api } from '@/client-api/fetchApi';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

export const getUser = async (): Promise<User> => {
  const response = (await api.get('/auth/me')) as { data: User };
  return response.data;

  // return {
  //   id: '1',
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   password: 'password',
  //   createdAt: 13243534,
  // };
};


export const loginInputSchema = z.object({
    email: z.string().min(1, 'Required').email('Invalid email'),
    password: z.string().min(5, 'Required'),
  });
  
  export type LoginInput = z.infer<typeof loginInputSchema>;

export const login = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};


export const registerInputSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
    password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  });

export type RegisterInput = z.infer<typeof registerInputSchema>;

export const register = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/register', data);
};
