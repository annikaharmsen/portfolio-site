import { Projects } from '@/types/types';
import { Show as Project } from './show';

export default function ProjectsIndex({ projects }: { projects: Projects }) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            {projects && projects.map((project) => <Project key={project.id} project={project} />)}
        </div>
    );
}
