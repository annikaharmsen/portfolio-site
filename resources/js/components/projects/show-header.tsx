import { DeleteButton, EditButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import { ProjectConfig } from '@/config/config';
import useController from '@/hooks/use-controller';
import type { Project } from '@/types/models';
import { FeaturedStar } from './featured-star';

export default function ProjectShowHeader({ project }: { project: Project }) {
    const controller = useController<Project>(ProjectConfig.BASE_URI);
    const handleDelete = () => {
        if (project && confirm('Are you sure you want to delete this project?')) controller.delete(project);
    };

    return (
        <div className="flex items-center justify-between pb-8">
            <H1>
                {project.title} <span className="pl-4 font-normal text-gray-400">- preview</span>
            </H1>

            <div className="flex items-center space-x-2">
                <FeaturedStar project={project} className="mx-4 size-5" />
                <EditButton variant="outline" onClick={() => controller.edit(project)} />
                <DeleteButton onClick={handleDelete} showIcon />
            </div>
        </div>
    );
}
