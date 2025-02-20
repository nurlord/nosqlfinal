import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';
import { getRoutes } from './routes/index.tsx';

const queryClient = new QueryClient();
const router = createBrowserRouter(getRoutes());
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />,
  </QueryClientProvider>,
);
