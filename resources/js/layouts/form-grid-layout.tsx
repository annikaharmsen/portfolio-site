import { cn } from '@/lib/utils';
import { Children, isValidElement, ReactNode } from 'react';

export default function FormGridLayout({ children, className }: { children: ReactNode; className?: string }) {
    const items = Children.toArray(children).filter(isValidElement);

    return (
        <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', className)}>
            {items.map((child, index) => {
                const props = child.props as { className?: string };
                return (
                    <div key={index} className={cn('col-span-2 space-y-2', props?.className)}>
                        {child}
                    </div>
                );
            })}
        </div>
    );
}
