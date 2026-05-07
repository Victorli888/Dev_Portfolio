import Hero from '@/components/Hero/Hero';
import ProjectsSection from '@/components/Projects/ProjectsSection';
import { getProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getProjects();

  return (
    <main className="max-w-[1600px] mx-auto py-16 space-y-16">
      <div className="px-4 sm:px-6 lg:px-[10%]">
        <Hero
          name="Victor Li"
          title="Software Engineer"
          tagline={"Mechanical Engineering Student Turned Professional Software Engineer\nBuilt To Learn, Driven to Evolve"}
          githubUrl="https://github.com/Victorli888"
          linkedinUrl="https://linkedin.com/in/victorli2"
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-[10%]">
        <ProjectsSection projects={projects} />
      </div>
    </main>
  );
}
