import { getIcon } from '@/lib/generated-icons';

interface IconListItem {
    name: string;
    icon_name: string;
}

export default function IconList({ items = [] }: { items?: IconListItem[] }) {
    return (
        <>
            {items &&
                items.map((item) => {
                    const SkillIcon = getIcon(item.icon_name);

                    return (
                        <div className="flex items-center gap-2 text-sm">
                            <SkillIcon className="h-4 w-4 text-secondary" />
                            <span>{item.name}</span>
                        </div>
                    );
                })}
        </>
    );
}
