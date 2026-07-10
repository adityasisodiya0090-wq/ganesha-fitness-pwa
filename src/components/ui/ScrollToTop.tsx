import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior // Instant scroll to top on navigation is standard for smooth SPA layout swapping
    });
  }, [pathname]);

  return null;
}
