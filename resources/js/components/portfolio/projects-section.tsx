import ProjectCard from '@/components/portfolio/project-card';
import { Projects } from '@/types/models';

export default function ProjectsSection({ projects }: { projects: Projects }) {
    const featuredProjects = projects.filter((project) => project.featured);
    if (featuredProjects.length < 1) return;

    return (
        <section id="projects" className="bg-muted py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 className="mb-12 text-center text-4xl uppercase">Projects</h2>
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
