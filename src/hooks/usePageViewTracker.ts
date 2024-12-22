import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * Custom hook to track route changes and send pageview events
 */
const usePageViewTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // Do not track localhost
  useEffect(() => {
    if (window.location.href.includes('localhost')) return;

    ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
    setInitialized(true);
  }, []);

  // Send pageview event on location change
  useEffect(() => {
    if (!initialized) return;

    ReactGA.set({ page: location.pathname });
    ReactGA.send('pageview');
  }, [initialized, location]);
};

export default usePageViewTracker;
