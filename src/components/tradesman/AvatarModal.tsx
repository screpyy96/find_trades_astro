import React, { useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface WorkerProfilee {
  id: string;
  name: string;
  avatar_url?: string | null;
  is_verified?: boolean;
  [key: string]: any;
}

interface AvatarModalProps {
  worker: WorkerProfilee;
  onClose: () => void;
}

export function AvatarModal({ worker, onClose }: AvatarModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!worker) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-3 rounded-2xl text-white bg-black/50 hover:bg-black/70 transition-all backdrop-blur-sm z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {worker.avatar_url ? (
          <img 
            src={worker.avatar_url} 
            alt={`${worker.name} - Profile`}
            className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-6xl md:text-8xl">
              {(worker.name || 'M').charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{worker.name}</h3>
          {worker.is_verified && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Verificat</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
