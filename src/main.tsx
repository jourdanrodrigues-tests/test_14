import React from 'react';

import { ThemeProvider } from '@material-tailwind/react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import '@/index.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import RouterProvider from '@/providers/RouterProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // @ts-expect-error - There's an annoying type bug with material-tailwind
  <React.StrictMode>
    <ReactQueryProvider>
      <ThemeProvider>
        {/* @ts-expect-error - No idea what's going on here */}
        <RouterProvider />
      </ThemeProvider>
    </ReactQueryProvider>
    <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
  </React.StrictMode>
);
