'use client';

import { useEffect, useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  iconPos?: { x: number; y: number };
}

function computeTransformOrigin(iconPos: { x: number; y: number }): string {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const panelW = Math.min(vw * 0.9, 900);
  const panelH = vh * 0.85;
  const panelLeft = (vw - panelW) / 2;
  const panelTop = (vh - panelH) / 2;
  return `${iconPos.x - panelLeft}px ${iconPos.y - panelTop}px`;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl, iconPos }: ResumeModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');

  useEffect(() => {
    if (isOpen) {
      if (iconPos) setTransformOrigin(computeTransformOrigin(iconPos));
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, iconPos]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Expanding panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
          style={{ transformOrigin }}
          className={`
            pointer-events-auto w-[90vw] max-w-[900px] h-[85vh]
            bg-white rounded-2xl shadow-2xl overflow-hidden
            transition-all duration-300 ease-out
            ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm tracking-wide">Resume</h2>
            <div className="flex items-center gap-4">
              <a
                href={resumeUrl}
                download="VictorLi_Resume.pdf"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              >
                Download PDF
              </a>
              <button
                onClick={onClose}
                aria-label="Close resume"
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          <iframe
            src={resumeUrl}
            className="w-full h-[calc(100%-57px)]"
            title="Victor Li Resume"
          />
        </div>
      </div>
    </>
  );
}
