import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';

const parseMarkdown = async (content: string) => {
    const parsed = await marked.parse(content);
    const sanitized = DOMPurify.sanitize(parsed);
    return sanitized;
};

export default function Markdown({
    children = '',
    className,
    ...props
}: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'dangerouslySetInnerHTML'> & { children?: string | TrustedHTML }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        parseMarkdown((children as string) || '').then((md) => setMarkdown(md));
    }, [children]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: markdown }}
            className={cn('prose dark:prose-invert', 'text-foreground *:text-inherit [&_ol]:text-left [&_ul]:text-left', className)}
            {...props}
        />
    );
}
