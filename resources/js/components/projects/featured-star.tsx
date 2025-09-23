import { cn } from '@/lib/utils';
import { Project } from '@/types/models';
import { router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';

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
