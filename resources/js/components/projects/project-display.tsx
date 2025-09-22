import { router } from '@inertiajs/react';
import { Edit, Star } from 'lucide-react';

import { DeleteButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import ProjectCard from '@/components/portfolio/project-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/models';

export default function ProjectDisplay({ project }: { project: Project }) {
    const handleEdit = () => {
        router.get(`/projects/${project.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${project.id}`);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 pl-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            <H1>
                                {project.title} <span className="font-normal text-gray-400">- preview</span>
                            </H1>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {!!project.featured && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="size-3 fill-yellow-500 text-yellow-500" />
                            Featured
                        </Badge>
                    )}
                    <Button variant="outline" onClick={handleEdit}>
                        <Edit className="mr-2 size-4" />
                        Edit
                    </Button>
                    <DeleteButton onClick={handleDelete} showIcon />
                </div>
            </div>

            {/* Content */}
            <ProjectCard project={project} />
        </div>
    );
}
