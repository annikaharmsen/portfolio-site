import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

// h1-h6
const classes = 'm-2 font-semibold text-foreground';

export const H1 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn('text-2xl sm:text-4xl', classes, className)} {...props}></h1>
);

export const H2 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn('text-2xl', classes, className)} {...props}></h2>
);

export const H3 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('text-xl', classes, className)} {...props}></h3>;

export const H4 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h4 className={cn('text-xl', classes, className)} {...props}></h4>;

export const H5 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h5 className={cn('text-lg', classes, className)} {...props}></h5>;

export const H6 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h6 className={cn('text-lg', classes, className)} {...props}></h6>;
