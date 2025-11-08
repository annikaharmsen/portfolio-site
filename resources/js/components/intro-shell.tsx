import { cn } from '@/lib/utils';
import { ReactComponent } from 'node_modules/@inertiajs/react/types/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export default function IntroShell({
    Subtitle,
    Bio,
    ViewWorkButton,
    ResumeButton,
}: {
    Subtitle: ReactComponent;
    Bio?: ReactComponent;
    ViewWorkButton: ReactComponent;
    ResumeButton?: ReactComponent;
}) {
    return (
        <div className="mt-28 px-2 text-right">
            <Title />

            <IntroArticle>
                <Subtitle />
                {!!Bio && <Bio />}
            </IntroArticle>

            <div className="flex flex-col flex-wrap justify-end gap-3 sm:flex-row sm:gap-4">
                <ViewWorkButton />
                {!!ResumeButton && <ResumeButton />}
            </div>
        </div>
    );
}

export const Title = () => (
    <>
        <h1 className="font-fascinate text-5xl leading-none text-primary sm:text-8xl lg:text-9xl">Annika</h1>
        <div className="flex justify-end text-primary">
            {/* Mobile SVG - optimized for smaller screens */}
            <svg viewBox="0 0 400 80" className="h-20 w-auto sm:h-28 lg:hidden" xmlns="http://www.w3.org/2000/svg">
                <text
                    x="395"
                    y="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    fontSize="64"
                    fontFamily="var(--font-fascinate)"
                    style={{ color: 'hsl(var(--primary))' }}
                    textAnchor="end"
                >
                    HARMSEN
                </text>
            </svg>
            {/* Desktop SVG - optimized for text-9xl (128px) */}
            <svg viewBox="0 0 800 160" className="hidden h-36 w-auto lg:block" xmlns="http://www.w3.org/2000/svg">
                <text
                    x="795"
                    y="120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    fontSize="128"
                    fontFamily="var(--font-fascinate)"
                    style={{ color: 'hsl(var(--primary))' }}
                    textAnchor="end"
                >
                    HARMSEN
                </text>
            </svg>
        </div>
    </>
);

export const IntroArticle = ({ className, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <article
        className={cn('sm:text-md mb-6 ml-auto max-w-xs text-sm leading-relaxed text-foreground sm:mb-8 sm:max-w-lg', className)}
        {...props}
    ></article>
);
