import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  origin: string;
  summary: string;
  stack: string[];
  tags: string[];
  links: ProjectLink[];
  content: string;
}

const projectsDir = path.join(process.cwd(), 'content', 'projects');

export function getProjects(): ProjectData[] {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
  files.sort();

  return files.map((filename) => {
    const slug = filename.replace(/^\d+-/, '').replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      origin: data.origin ?? '',
      summary: data.summary ?? '',
      stack: data.stack ?? [],
      tags: data.tags ?? [],
      links: data.links ?? [],
      content: content.trim(),
    };
  });
}
