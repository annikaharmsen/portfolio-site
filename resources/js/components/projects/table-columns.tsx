import { Project } from '@/types/models';
import IconComponent from '../icon-component';
import { FeaturedStar } from './featured-star';

export const ProjectTableColumns = [
    {
        name: 'Icon',
        dataComponent: (project: Project) => (
            <td className="p-2">
                <IconComponent icon_name={project.icon_name} className="mx-auto" />
            </td>
        ),
    },
    {
        name: 'Title',
        headingComponent: <th className="p-2 text-left whitespace-nowrap">Name</th>,
        dataComponent: (project: Project) => <td className="p-2">{project.title}</td>,
    },
    {
        name: 'Featured',
        dataComponent: (project: Project) => (
            <td className="p-2">
                <FeaturedStar project={project} />
            </td>
        ),
    },
    {
        name: 'Date',
        headingComponent: <th className="p-2 text-right whitespace-nowrap">Date</th>,
        dataComponent: (project: Project) => <td className="p-2 text-right">{project.date}</td>,
    },
];
