import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { Marked, type Tokens, marked } from 'marked';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';

const parseMarkdown = async (content: string, headingLevelOffset = 0) => {
    const instance = new Marked();

    if (headingLevelOffset > 0) {
        instance.use({
            renderer: {
                heading({ text, depth }: Tokens.Heading) {
                    const level = Math.min(depth + headingLevelOffset, 6) as 1 | 2 | 3 | 4 | 5 | 6;
                    return `<h${level}>${text}</h${level}>`;
                },
            },
        });
    }

    const parsed = await instance.parse(content);
    const sanitized = DOMPurify.sanitize(parsed);
    return sanitized;
};

export default function Markdown({
    children = '',
    className,
    headingLevelOffset = 0,
    ...props
}: Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'dangerouslySetInnerHTML'> & {
    children?: string | TrustedHTML;
    headingLevelOffset?: number;
}) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        parseMarkdown((children as string) || '', headingLevelOffset).then((md) => setMarkdown(md));
    }, [children, headingLevelOffset]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: markdown }}
            className={cn('prose dark:prose-invert', 'text-foreground *:text-inherit [&_ol]:text-left [&_ul]:text-left', className)}
            {...props}
        />
    );
}
