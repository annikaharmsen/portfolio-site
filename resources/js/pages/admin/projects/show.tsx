import ProjectCard from '@/components/portfolio/project-card';
import ProjectShowHeader from '@/components/projects/show-header';
import { Project } from '@/types/models';
import { Head } from '@inertiajs/react';

interface ShowProps {
    project: Project;
}

export default function ShowProject({ project }: ShowProps) {
    return (
        <>
            <Head title={project.title} />
            <ProjectShowHeader project={project} />
            <ProjectCard project={project} />
        </>
    );
}
