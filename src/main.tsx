import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from 'App';
import { AuthProvider } from '@contexts/AuthContext';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root') as HTMLElement;
const element = (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
createRoot(root).render(element);
