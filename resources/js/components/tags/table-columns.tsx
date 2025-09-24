import { ProjectTag } from '@/types/models';
import IconComponent from '../icon-component';

export const TagTableColumns = [
    {
        name: 'Icon',
        headingComponent: <th>Icon</th>,
        dataComponent: (item: ProjectTag) => (
            <td>
                <IconComponent icon_name={item.icon_name} className="mx-auto" />
            </td>
        ),
    },
    {
        name: 'Name',
        headingComponent: <th className="text-left">Name</th>,
        dataComponent: (item: ProjectTag) => <td>{item.name}</td>,
    },
];
