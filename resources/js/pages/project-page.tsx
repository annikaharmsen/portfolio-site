import CenteredContent from '@/components/centered-content';
import { H1, H2 } from '@/components/headings';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Project, ProjectHeroSection } from '@/types/models';
import { ArrowLeft } from 'lucide-react';

export default function ProjectPage({ project }: { project: Project }) {
    // hero section component
    const HeroSection = ({ section, index }: { section: ProjectHeroSection; index: number }) => (
        <div
            className={cn(
                'flex w-full flex-col-reverse items-center justify-around gap-8 pt-4 pb-8 text-center md:flex-row md:gap-16 md:px-24 md:pt-8 md:pb-16',
                section.image && 'md:text-left',
                index % 2 == 1 && 'md:flex-row-reverse',
            )}
        >
            {section.image && (
                <img src={section.image.url} alt="" className="h-48 w-auto max-w-full rounded-2xl object-contain md:h-100 md:max-w-2/5" />
            )}
            <article className="w-full">
                <H2>{section.heading}</H2>
                <p>{section.text}</p>
            </article>
        </div>
    );

    return (
        <CenteredContent>
            <Button
                onClick={() => history.back()}
                variant="ghost"
                className="absolute top-4 left-4 size-8 rounded-full md:top-6 md:left-6 md:size-12"
            >
                <ArrowLeft className="md:size-6" />
            </Button>
            <div className="m-8 flex flex-col items-center text-center md:m-16">
                <H1>{project.title}</H1>
                <span>{project.subtitle}</span>
            </div>
            <div className="w-full max-w-300 px-8 md:px-16">
                {project.hero_sections?.map((section, index) => (
                    <>
                        <hr />
                        <HeroSection section={section} index={index} />
                    </>
                ))}
                <hr />
            </div>
            <div className="my-12 flex w-full justify-center">
                <Button variant="link" onClick={() => history.back()}>
                    <ArrowLeft />
                    Back to homepage
                </Button>
            </div>
        </CenteredContent>
    );
}
