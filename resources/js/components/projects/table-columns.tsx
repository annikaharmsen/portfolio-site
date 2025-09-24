import { Project } from '@/types/models';
import IconComponent from '../icon-component';
import { FeaturedStar } from './featured-star';

export const ProjectTableColumns = [
    {
        name: 'Icon',
        dataComponent: (project: Project) => (
            <td>
                <IconComponent icon_name={project.icon_name} className="mx-auto" />
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
