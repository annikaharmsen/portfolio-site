import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
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
