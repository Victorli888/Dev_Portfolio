'use client';

import { useEffect } from 'react';

interface ResumeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export default function ResumeDrawer({ isOpen, onClose, resumeUrl }: ResumeDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">Resume</h2>
          <div className="flex items-center gap-4">
            <a
              href={resumeUrl}
              download="VictorLi_Resume.pdf"
              className="text-sm text-blue-600 hover:underline"
            >
              Download PDF
            </a>
            <button
              onClick={onClose}
              aria-label="Close resume"
              className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
        <iframe
          src={resumeUrl}
          className="w-full h-[calc(100%-57px)]"
          title="Victor Li Resume"
        />
      </div>
    </>
  );
}
