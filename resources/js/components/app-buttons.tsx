import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, Edit, ExternalLink, Github, Linkedin, Trash2 } from 'lucide-react';
import { ComponentProps } from 'react';

export const CancelButton = ({ ...props }: ComponentProps<typeof Button>) => (
    <Button type="button" variant="outline" {...props}>
        {props.children || 'Cancel'}
    </Button>
);

export const SaveButton = ({ ...props }: ComponentProps<typeof Button>) => (
    <Button type="submit" {...props}>
        {props.children || 'Save'}
    </Button>
);

export const DeleteButton = ({ showIcon, ...props }: ComponentProps<typeof Button> & { showIcon?: boolean }) => (
    <Button variant="destructive" className={cn(props.disabled ? 'opacity-60' : '', 'gap-2')} {...props}>
        {showIcon && <Trash2 className="size-4" />}
        {props.children || 'Delete'}
    </Button>
);

export const EditButton = ({ showIcon, ...props }: ComponentProps<typeof Button> & { showIcon?: boolean }) => (
    <Button variant="outline" {...props}>
        {showIcon && <Edit className="mr-2 size-4" />}
        {props.children || 'Edit'}
    </Button>
);

export const LinkButton = ({ href, children, ...props }: { href?: string } & ComponentProps<typeof Button>) => (
    <Button onClick={(e) => e.stopPropagation()} asChild={!!href} disabled={!href} {...props}>
        {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        ) : (
            <>{children}</>
        )}
    </Button>
);

const hoverBaseStyles = 'border-foreground bg-transparent transition-all duration-300';
const hoverVariants = {
    secondary: 'hover:border-secondary hover:bg-secondary hover:text-secondary-foreground',
    accent: 'hover:border-accent hover:bg-accent hover:text-accent-foreground',
};

type HoverButton<B extends typeof Button = typeof Button> = { hoverVariant?: keyof typeof hoverVariants } & ComponentProps<B>;

export const GitHubButton = ({ href, hoverVariant = 'accent', className, children = 'View Code', ...props }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} size="sm" variant="outline" className={cn(hoverBaseStyles, hoverVariants[hoverVariant], className)} {...props}>
        <Github className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);

export const LinkedinButton = ({ href, hoverVariant = 'accent', className, children = 'Linkedin', ...props }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} size="sm" variant="outline" className={cn(hoverBaseStyles, hoverVariants[hoverVariant], className)} {...props}>
        <Linkedin className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);

export const DemoButton = ({ href, hoverVariant = 'accent', className, children = 'Live Demo', ...props }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} variant="outline" size="sm" className={cn(hoverBaseStyles, hoverVariants[hoverVariant], className)} {...props}>
        <ExternalLink className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);

export const ViewWorkButton = ({ href, className, children = 'View My Work', ...props }: ComponentProps<typeof LinkButton>) => (
    <LinkButton
        href={href}
        size="lg"
        className={cn('bg-primary transition-colors duration-300 hover:bg-accent hover:text-accent-foreground', className)}
        {...props}
    >
        {children}
    </LinkButton>
);

export const ResumeButton = ({ href, className, children = 'Download Resume', ...props }: ComponentProps<typeof LinkButton>) => (
    <LinkButton
        href={href}
        variant="outline"
        size="lg"
        className={cn(
            'border-primary bg-transparent transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground',
            className,
        )}
        {...props}
    >
        <Download className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);
