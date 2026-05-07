import ProjectToggle from './ProjectToggle';
import type { ProjectData } from '@/lib/projects';

interface ProjectsSectionProps {
  projects: ProjectData[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section>
      <h2 className="font-display text-4xl font-bold text-ink mb-8">
        Projects
      </h2>
      <div className="divide-y divide-border">
        {projects.map((project, index) => (
          <ProjectToggle key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
