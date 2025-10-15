import { Tag } from '@/types/models';
import IconComponent from '../icon-component';

export const TagTableColumns = [
    {
        name: 'Icon',
        headingComponent: <th className="p-2 whitespace-nowrap">Icon</th>,
        dataComponent: (item: Tag) => (
            <td className="p-2">
                <IconComponent icon_name={item.icon_name} className="mx-auto" />
            </td>
        ),
    },
    {
        name: 'Name',
        headingComponent: <th className="p-2 text-left whitespace-nowrap">Name</th>,
        dataComponent: (item: Tag) => <td className="p-2">{item.name}</td>,
    },
];
