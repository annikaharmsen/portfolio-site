import { DeleteButton, EditButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import useController from '@/hooks/use-controller';
import type { Project } from '@/types/models';
import { FeaturedStar } from './table-columns';

export default function ProjectShowHeader({ project }: { project: Project }) {
    const controller = useController<Project>('projects');

    return (
        <div className="flex items-center justify-between pb-8">
            <H1>
                {project.title} <span className="pl-4 font-normal text-gray-400">- preview</span>
            </H1>

            <div className="flex items-center space-x-2">
                <FeaturedStar project={project} className="mx-4 size-5" />
                <EditButton variant="outline" onClick={() => controller.edit(project)} />
                <DeleteButton onClick={() => controller.delete(project)} showIcon />
            </div>
        </div>
    );
}
