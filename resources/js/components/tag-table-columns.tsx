import { ProjectTag } from '@/types/models';
import IconComponent from './icon-component';

export const TagTableColumns = [
    {
        name: 'Icon',
        headingComponent: <th>Icon</th>,
        dataComponent: (item: ProjectTag) => <td>{IconComponent(item)}</td>,
    },
    {
        name: 'Name',
        headingComponent: <th className="text-left">Name</th>,
        dataComponent: (item: ProjectTag) => <td>{item.name}</td>,
    },
];
