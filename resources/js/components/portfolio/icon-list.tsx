import { LucideIcon } from 'lucide-react';

interface IconListItem {
    name: string;
    icon: LucideIcon;
}

export default function IconList({ items = [] }: { items?: IconListItem[] }) {
    return (
        <>
            {items &&
                items.map((item) => (
                    <div className="flex items-center gap-2 text-sm">
                        <item.icon className="h-4 w-4 text-secondary" />
                        <span>{item.name}</span>
                    </div>
                ))}
        </>
    );
}
