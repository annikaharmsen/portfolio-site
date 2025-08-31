import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({ message, className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={cn('ml-1 text-sm text-destructive', className)}>
            {message}
            {children}
        </p>
    ) : null;
}
