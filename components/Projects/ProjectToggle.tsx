'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ChevronIcon from '@/components/ui/ChevronIcon';
import type { ProjectData } from '@/lib/projects';

interface ProjectToggleProps {
  project: ProjectData;
  index: number;
  defaultOpen?: boolean;
}

export default function ProjectToggle({ project, index, defaultOpen = false }: ProjectToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-start gap-5 py-7 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          <ChevronIcon
            isOpen={isOpen}
            className={`transition-colors duration-200 ${isOpen ? 'text-brand' : 'text-ink-faint'}`}
          />
          <span className="font-display text-sm font-semibold text-brand select-none">
            {num}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-display text-xl font-semibold text-ink group-hover:text-brand transition-colors duration-200">
              {project.title}
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-sans text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(115,165,202,0.15)', color: '#2B7BAE' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          {project.origin && (
            <p className="font-sans text-xs font-medium text-ink-faint mt-0.5 tracking-wide uppercase">
              {project.origin}
            </p>
          )}
          {project.summary && (
            <p className="font-sans text-sm text-ink-muted mt-1 leading-snug">
              {project.summary}
            </p>
          )}
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className={`overflow-hidden transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pl-16 pb-12">
          <div className="h-px bg-border mb-8" />

          {project.links.length > 0 && (
            <div className="flex gap-4 mb-8">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-border text-ink-muted hover:border-brand hover:text-brand transition-colors duration-150 cursor-pointer"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}

          <div className="prose prose-stone max-w-none w-full break-words prose-p:text-ink prose-p:leading-relaxed prose-p:text-base prose-li:text-ink prose-headings:font-sans prose-headings:font-semibold prose-h2:text-xs prose-h2:tracking-widest prose-h2:uppercase prose-h2:text-ink-muted prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-sm prose-h3:text-ink prose-h3:mt-6 prose-h3:mb-2 prose-h4:text-xs prose-h4:text-ink-muted prose-h4:uppercase prose-h4:tracking-wide prose-strong:text-ink prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{project.content}</ReactMarkdown>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
