
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import './index.css'
import App from './components/App/App';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
  </React.StrictMode>
)