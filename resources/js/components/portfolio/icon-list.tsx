import IconComponent from '../icon-component';
import { IconName } from '../icon-selector-dropdown';

interface IconListItem {
    name: string;
    icon_name: IconName;
}

export default function IconList({ items = [] }: { items?: IconListItem[] }) {
    return (
        <>
            {items &&
                items.map((item) => (
                    <div className="flex items-center gap-2 text-sm">
                        <IconComponent icon_name={item.icon_name} className="h-4 w-4 text-secondary" />
                        <span>{item.name}</span>
                    </div>
                ))}
        </>
    );
}
