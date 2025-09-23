import { cn } from '@/lib/utils';
import { Project } from '@/types/models';
import { router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';
import IconComponent from './icon-component';

export const FeaturedStar = ({ project, className }: { project: Project; className?: ClassNameValue }) => {
    const toggleFeatured = (project: Project) => {
        router.put(`/projects/${project.id}`, { ...project, featured: !project.featured });
    };

    return (
        <Star
            className={cn('m-auto h-4 w-4 cursor-pointer text-yellow-500', project.featured ? 'fill-yellow-500' : '', className)}
            onClick={(e) => {
                e.stopPropagation();
                toggleFeatured(project);
            }}
        />
    );
};

export const ProjectTableColumns = [
    {
        name: 'Icon',
        dataComponent: (project: Project) => (
            <td>
                <IconComponent icon_name={project.icon_name} />
            </td>
        ),
    },
    {
        name: 'Title',
        headingComponent: <th className="text-left">Name</th>,
        dataComponent: (project: Project) => <td>{project.title}</td>,
    },
    {
        name: 'Featured',
        dataComponent: (project: Project) => (
            <td>
                <FeaturedStar project={project} />
            </td>
        ),
    },
    {
        name: 'Date',
        headingComponent: <th className="pr-4 text-right">Date</th>,
        dataComponent: (project: Project) => <td className="pr-4 text-right">{project.date}</td>,
    },
];
