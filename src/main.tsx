// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import './index.css'
import App from './components/App/App';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App/>
  </QueryClientProvider>
  </React.StrictMode>
)