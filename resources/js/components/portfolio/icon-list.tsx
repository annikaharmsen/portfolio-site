import { cn } from '@/lib/utils';
import { Tag } from '@/types/models';
import { HTMLAttributes } from 'react';
import IconComponent from '../icon-component';

export default function IconList({ items = [], className, ...props }: HTMLAttributes<HTMLDivElement> & { items?: Tag[] }) {
    return (
        <>
            {items &&
                items.map((item) => (
                    <div className={cn('flex items-center gap-2 text-sm text-secondary', className)} {...props}>
                        <IconComponent icon_name={item.icon_name} className="size-4" />
                        <span>{item.name}</span>
                    </div>
                ))}
        </>
    );
}

export const IconTag = ({ tag, className, ...props }: HTMLAttributes<HTMLDivElement> & { tag: Tag }) => (
    <div className={cn('flex items-center gap-2 text-sm text-secondary', className)} {...props}>
        <IconComponent icon_name={tag.icon_name} className="size-4" />
        <span>{tag.name}</span>
    </div>
);
