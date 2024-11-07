import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from 'App';
import { AuthProvider } from '@contexts/AuthContext';
import { createRoot } from 'react-dom/client';
// import * as Sentry from '@sentry/react';

// Sentry.init({
//   dsn: import.meta.env.VITE_SENTRY_DSN,
//   release: 'Sprint 3',
//   environment: 'production',
//   integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
//   // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   // tracePropagationTargets: ['localhost', import.meta.env.VITE_API_URL],
//   tracePropagationTargets: [import.meta.env.VITE_API_URL],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

const root = document.getElementById('root') as HTMLElement;
const element = (
  <BrowserRouter>
    <AuthProvider>
      {/* <Sentry.ErrorBoundary fallback={<span>에러가 발생하였습니다. 잠시 후 다시 시도해주세요.</span>}> */}
      <App />
      {/* </Sentry.ErrorBoundary> */}
    </AuthProvider>
  </BrowserRouter>
);
createRoot(root).render(element);
