import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Wifi, WifiOff, X, Sparkles } from 'lucide-react';
import Button from './Button';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAHelper() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showConnectionToast, setShowConnectionToast] = useState(false);
  const [connectionType, setConnectionType] = useState<'online' | 'offline' | null>(null);

  useEffect(() => {
    // 1. Listen for standard beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show banner if user has not dismissed it in this session
      const isDismissed = sessionStorage.getItem('pwa-install-dismissed');
      if (!isDismissed) {
        // Show banner after a short delay for better user experience
        const timer = setTimeout(() => {
          setShowInstallBanner(true);
        }, 4000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 2. Listen for connection state changes
    const handleOnline = () => {
      setIsOnline(true);
      setConnectionType('online');
      setShowConnectionToast(true);
      
      // Auto-hide online toast after 3.5 seconds
      const timer = setTimeout(() => {
        setShowConnectionToast(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setConnectionType('offline');
      setShowConnectionToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 3. Track when the app was successfully installed
    const handleAppInstalled = () => {
      console.log('PWA was installed successfully');
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Hide the banner first
    setShowInstallBanner(false);
    
    // Trigger prompt
    await deferredPrompt.prompt();
    
    // Wait for choice
    const choiceResult = await deferredPrompt.userChoice;
    console.log(`User chosen choice: ${choiceResult.outcome}`);
    
    // Clear deferred prompt
    setDeferredPrompt(null);
  };

  const handleDismissInstall = () => {
    sessionStorage.setItem('pwa-install-dismissed', 'true');
    setShowInstallBanner(false);
  };

  return (
    <>
      <AnimatePresence>
        {/* Offline / Online Connection State Banner */}
        {showConnectionToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
            id="pwa-connection-toast"
          >
            <div className={`p-4 rounded-sm border backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4 ${
              connectionType === 'offline' 
                ? 'bg-charcoal/95 border-red-500/20 text-white' 
                : 'bg-charcoal/95 border-gold-500/20 text-white'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-sm ${
                  connectionType === 'offline' ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-gold-500/10 text-gold-500'
                }`}>
                  {connectionType === 'offline' ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-display font-bold text-xs uppercase tracking-wider block">
                    {connectionType === 'offline' ? 'CONNECTION OFFLINE' : 'BACK ONLINE'}
                  </span>
                  <span className="font-sans text-[11px] text-gray-400 block leading-tight mt-0.5">
                    {connectionType === 'offline' 
                      ? 'You are offline. Showing cached pages and resources.' 
                      : 'Connection restored successfully. Synced state.'}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowConnectionToast(false)}
                className="text-gray-500 hover:text-white transition-colors p-1"
                aria-label="Dismiss Alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* PWA Floating Installation Banner */}
        {showInstallBanner && deferredPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
            className="fixed bottom-6 right-6 left-6 sm:left-auto z-[99] max-w-lg sm:w-[460px]"
            id="pwa-install-banner"
          >
            <div className="bg-charcoal/95 border border-gold-500/20 rounded-sm p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
              {/* Gold gradient top header border line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-gold" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-sm bg-gold-500/10">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase font-semibold">
                    PREMIUM WEB APP EXPERIENCE
                  </span>
                </div>
                <button
                  onClick={handleDismissInstall}
                  className="text-gray-500 hover:text-white transition-colors p-1 bg-matte/50 hover:bg-matte border border-gold-500/5 hover:border-gold-500/15 rounded-sm"
                  aria-label="Close installation prompt"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 mb-6">
                <h4 className="font-display font-extrabold text-base sm:text-lg text-white uppercase tracking-wider">
                  Install Ganesha Fitness
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Add to your home screen for rapid offline launches, direct access to premium schedules, full-screen luxury display, and optimal bandwidth optimization.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleInstallClick}
                  className="flex-1 flex items-center justify-center gap-2 font-semibold text-xs py-3"
                >
                  <Download className="w-3.5 h-3.5" />
                  Install App
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleDismissInstall}
                  className="flex-1 text-xs py-3"
                >
                  Later
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
