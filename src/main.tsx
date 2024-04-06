import React from 'react';

import { ThemeProvider } from '@material-tailwind/react';
import ReactDOM from 'react-dom/client';

import '@/index.css';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import RouterProvider from '@/providers/RouterProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
