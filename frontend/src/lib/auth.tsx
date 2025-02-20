import { configureAuth } from 'react-query-auth';
import { Navigate } from 'react-router';
import { z } from 'zod';

import { AuthResponse, User } from '@/types/api';
import { api } from './axios';

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');

  return response.data;
};

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const loginInputSchema = z.object({
  login: z
    .string()
    .min(1, 'Required')
    .refine((s) => !s.includes(' '), 'Login cannot contain any spaces'),
  password: z.string().min(8, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailOrUsernameAndPassword = (
  data: LoginInput,
): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z
  .object({
    email: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    password: z.string().min(5, 'Required'),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, 'Required'),
        teamName: z.null().default(null),
      })
      .or(
        z.object({
          teamName: z.string().min(1, 'Required'),
          teamId: z.null().default(null),
        }),
      ),
  );

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailUsernameAndPassword = (
  data: RegisterInput,
): Promise<Partial<AuthResponse>> => {
  return api.post('/auth/register', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailOrUsernameAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailUsernameAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (!user.data) {
    return <Navigate to='/auth/login' replace />;
  }

  return children;
};
