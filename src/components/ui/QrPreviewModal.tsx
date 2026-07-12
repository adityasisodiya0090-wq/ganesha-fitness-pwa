import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Copy, Check, Smartphone, Sparkles, ExternalLink } from 'lucide-react';

interface QrPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrPreviewModal({ isOpen, onClose }: QrPreviewModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Use the active page URL (including hashes) dynamically so it works on any custom domain or environment
  const liveUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-immz2etpyeubauw2v4fdgt-878777090431.asia-southeast1.run.app';
  
  // Clean URL to encode for the QR Code generator
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&color=d4af37&bgcolor=141414&data=${encodeURIComponent(liveUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="qr-preview-portal" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-md bg-charcoal border border-gold-500/20 rounded-sm p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.07)] overflow-hidden"
          >
            {/* Ambient gold corner accent light */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-gold-500" />
                <div>
                  <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                    Instant Mobile Pass
                  </h3>
                  <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-0.5">
                    Ganesha Ecosystem
                  </span>
                </div>
              </div>
              <button
                type="button"
                id="close-qr-modal"
                onClick={onClose}
                className="p-1.5 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {/* QR Render Target with glowing frame */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative p-4 bg-matte border border-gold-500/10 rounded-sm shadow-inner group">
                  {/* Glowing bracket accents representing camera target focus */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold-500" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold-500" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold-500" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold-500" />
                  
                  <img
                    src={qrCodeUrl}
                    alt="Ganesha Fitness Mobile QR Access Code"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xs relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Action Link Row */}
              <div className="bg-matte/50 rounded-sm border border-white/5 p-4 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="truncate font-mono text-[10px] text-gray-400 select-all">
                    {liveUrl}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      id="copy-qr-url"
                      onClick={handleCopy}
                      className="p-2 bg-charcoal hover:bg-white/5 border border-white/10 rounded-sm text-gray-400 hover:text-white transition-all duration-300 relative group"
                      title="Copy URL to clipboard"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-gold-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-charcoal hover:bg-white/5 border border-white/10 rounded-sm text-gray-400 hover:text-white transition-all duration-300"
                      title="Open live app in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="block text-center text-[9px] font-mono text-gold-500 uppercase tracking-widest font-bold"
                    >
                      ✓ URL Copied Successfully
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Interactive Steps */}
              <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-6 text-center">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-1">
                    <span className="font-mono text-[9px] text-gold-500 font-bold">1</span>
                  </div>
                  <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                    Aim Camera
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-1">
                    <span className="font-mono text-[9px] text-gold-500 font-bold">2</span>
                  </div>
                  <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                    Tap Banner
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-1">
                    <span className="font-mono text-[9px] text-gold-500 font-bold">3</span>
                  </div>
                  <span className="block text-[9px] font-mono text-gray-400 uppercase tracking-wider font-semibold">
                    Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Branding Footer in Modal */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-gold-500" />
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-semibold">
                Google Cloud Platform • Production Env
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
