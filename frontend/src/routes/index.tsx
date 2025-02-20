import App from '@/routes/app';
import { NotFoundRoute } from '@/NotFoundRoute';
import LoginRoute from './auth/login';
import RegisterRoute from './auth/register';

export const getRoutes = () => [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth/login',
    element: <LoginRoute />,
  },
  {
    path: '/auth/register',
    element: <RegisterRoute />,
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
];
