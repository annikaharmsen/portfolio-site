import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

// h1-h6
const classes = 'my-2 font-semibold text-foreground';

export const H1Classes = cn(classes, 'text-2xl sm:text-4xl');
export const H2Classes = cn(classes, 'text-2xl');
export const H3Classes = cn(classes, 'text-xl');
export const H4Classes = cn(classes, 'text-xl');
export const H5Classes = cn(classes, 'text-lg');
export const H6Classes = cn(classes, 'text-lg');

export const H1 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn(H1Classes, className)} {...props}></h1>;

export const H2 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn(H2Classes, className)} {...props}></h2>;

export const H3 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn(H3Classes, className)} {...props}></h3>;

export const H4 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h4 className={cn(H4Classes, className)} {...props}></h4>;

export const H5 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h5 className={cn(H5Classes, className)} {...props}></h5>;

export const H6 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => <h6 className={cn(H6Classes, className)} {...props}></h6>;

// Composite heading components
interface HeadingProps {
    title: string;
    description?: string;
    className?: string;
}

export const HeadingClasses = 'mb-8 space-y-0.5';
export const HeadingTitleClasses = 'text-xl font-semibold tracking-tight';
export const HeadingDescriptionClasses = 'text-sm text-muted-foreground';

export const Heading = ({ title, description, className }: HeadingProps) => (
    <div className={cn(HeadingClasses, className)}>
        <h2 className={HeadingTitleClasses}>{title}</h2>
        {description && <p className={HeadingDescriptionClasses}>{description}</p>}
    </div>
);

export const HeadingSmallClasses = '';
export const HeadingSmallTitleClasses = 'mb-0.5 text-base font-medium';
export const HeadingSmallDescriptionClasses = 'text-sm text-muted-foreground';

export const HeadingSmall = ({ title, description, className }: HeadingProps) => (
    <header className={cn(HeadingSmallClasses, className)}>
        <h3 className={HeadingSmallTitleClasses}>{title}</h3>
        {description && <p className={HeadingSmallDescriptionClasses}>{description}</p>}
    </header>
);
