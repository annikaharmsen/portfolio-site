import { Button } from '@/components/ui/button';
import { cn, openLink } from '@/lib/utils';
import { Edit, ExternalLink, Github, Trash2 } from 'lucide-react';
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

export const GitHubButton = ({ url }: { url: string }) => (
    <Button
        onClick={(e) => openLink(url || '#', e)}
        size="sm"
        variant="outline"
        className="cursor-pointer border-foreground bg-transparent transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
    >
        <Github className="mr-2 h-4 w-4" />
        View Code
    </Button>
);

export const DemoButton = ({ url }: { url: string }) => (
    <Button
        onClick={(e) => openLink(url || '#', e)}
        variant="outline"
        size="sm"
        className="cursor-pointer border-foreground bg-transparent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
    >
        <ExternalLink className="mr-2 h-4 w-4" />
        Live Demo
    </Button>
);
