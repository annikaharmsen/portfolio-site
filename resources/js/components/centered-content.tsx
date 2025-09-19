import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CenteredContentProps {
    horizontal?: boolean;
    vertical?: boolean;
    className?: string | string[];
    children: ReactNode;
}

export default function CenteredContent({ horizontal, vertical, className, children, ...props }: CenteredContentProps) {
    if (!horizontal && !vertical) {
        horizontal = true;
        vertical = true;
    }

    const classes = [horizontal && 'items-center', vertical && 'justify-center'];

    return (
        <div {...props} className={cn('flex h-screen flex-col', classes, className)}>
            {children}
        </div>
    );
}
