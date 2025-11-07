import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Edit, ExternalLink, Github, Linkedin, Trash2 } from 'lucide-react';
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

export const GitHubButton = ({ href, hoverVariant = 'accent', children = 'View Code' }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} size="sm" variant="outline" className={cn(hoverBaseStyles, hoverVariants[hoverVariant])}>
        <Github className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);

export const LinkedinButton = ({ href, hoverVariant = 'accent', children = 'Linkedin' }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} size="sm" variant="outline" className={cn(hoverBaseStyles, hoverVariants[hoverVariant])}>
        <Linkedin className="mr-2 h-4 w-4" />
        {children}
    </LinkButton>
);

export const DemoButton = ({ href, hoverVariant = 'accent' }: HoverButton<typeof LinkButton>) => (
    <LinkButton href={href} variant="outline" size="sm" className={cn(hoverBaseStyles, hoverVariants[hoverVariant])}>
        <ExternalLink className="mr-2 h-4 w-4" />
        Live Demo
    </LinkButton>
);
