'use client';

import { useRef, useState } from 'react';
import FileIcon from '@/components/ui/FileIcon';
import GitHubIcon from '@/components/ui/GitHubIcon';
import LinkedInIcon from '@/components/ui/LinkedInIcon';
import ResumeModal from './ResumeModal';

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

const HEX = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

function HexIcon({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      className="transition-all duration-200 group-hover:-translate-y-1"
      style={{
        filter: 'drop-shadow(0 0px 0px transparent)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.filter =
          `drop-shadow(0 8px 18px ${color}33)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.filter =
          'drop-shadow(0 0px 0px transparent)';
      }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center bg-border group-hover:bg-white transition-colors duration-200"
        style={{ clipPath: HEX }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Hero({
  name,
  title,
  tagline,
  githubUrl = 'https://github.com/Victorli888',
  linkedinUrl = 'https://linkedin.com/in/victorli',
}: HeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [iconPos, setIconPos] = useState<{ x: number; y: number }>();
  const resumeRef = useRef<HTMLButtonElement>(null);

  function openResume() {
    if (resumeRef.current) {
      const r = resumeRef.current.getBoundingClientRect();
      setIconPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setModalOpen(true);
  }

  return (
    <section className="flex flex-col items-center gap-10 py-6">
      {/* Stone + caption as a self-contained unit */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-square">
          <img
            src="/swe_evolution_stone.svg"
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 w-full h-full opacity-[0.18]"
          />
          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <div className="space-y-3">
              <h1 className="font-display font-bold text-5xl tracking-tight text-ink">
                {name}
                <span className="text-brand">.</span>
              </h1>
              <p className="font-sans text-base text-ink-muted font-medium">{title}</p>
            </div>

            <div className="flex items-center gap-10">
              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <HexIcon color="#24292e">
                  <GitHubIcon className="w-[30px] h-[30px] text-[#24292e]" />
                </HexIcon>
                <span className="font-sans text-xs tracking-widest uppercase text-[#24292e]/50 group-hover:text-[#24292e] transition-colors duration-200">
                  GitHub
                </span>
              </a>

              {/* Resume */}
              <button
                ref={resumeRef}
                onClick={openResume}
                aria-label="View Resume"
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <HexIcon color="#E87F24">
                  <FileIcon className="w-[30px] h-[30px] text-brand" />
                </HexIcon>
                <span className="font-sans text-xs tracking-widest uppercase text-brand/50 group-hover:text-brand transition-colors duration-200">
                  Resume
                </span>
              </button>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <HexIcon color="#0A66C2">
                  <LinkedInIcon className="w-[30px] h-[30px] text-[#0A66C2]" />
                </HexIcon>
                <span className="font-sans text-xs tracking-widest uppercase text-[#0A66C2]/50 group-hover:text-[#0A66C2] transition-colors duration-200">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
        <p className="font-sans text-xs text-ink-faint text-center whitespace-pre-line w-full max-w-[500px] px-4">
          {tagline}
        </p>
      </div>

      <ResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resumeUrl="/resume.pdf"
        iconPos={iconPos}
      />
    </section>
  );
}
