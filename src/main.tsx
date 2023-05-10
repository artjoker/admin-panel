import React from 'react';
import ReactDOM from 'react-dom/client';
import { isAxiosError } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeConfigProvider } from '@/modules/_Theme';
import { showErrorToast } from '@/components';

import './i18n/i18n';
import GlobalStyles from './styles/global';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 60000, // 60 minutes
      onError: (error) => {
        if (isAxiosError(error)) {
          showErrorToast({
            message: error.response?.statusText || error.message,
          });
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeConfigProvider>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
