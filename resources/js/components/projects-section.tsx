import ProjectsIndex from '@/components/projects/index';
import { Projects } from '@/types/types';

export default function ProjectsSection({ projects }: { projects: Projects }) {
    return (
        <section id="projects" className="bg-sage/60 py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <h2 className="mb-12 text-center font-fascinate text-4xl text-white">Projects</h2>
                <ProjectsIndex projects={projects} />
            </div>
        </section>
    );
}
