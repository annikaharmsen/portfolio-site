import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TechConfig } from '@/config/config';
import { cn, openLink } from '@/lib/utils';
import { Project } from '@/types/models';
import { Link, router } from '@inertiajs/react';
import { ChevronRight, ExternalLink, Star } from 'lucide-react';
import { DemoButton, GitHubButton } from '../app-buttons';
import { H3 } from '../headings';
import IconComponent from '../icon-component';
import { Badge } from '../ui/badge';
import IconList from './icon-list';

export default function ProjectCard({ project }: { project: Project }) {
    const mainLink = project.demo_link || project.repo_link || null;
    const hasProjectPage = !!project.hero_sections?.length;
    const isClickable = hasProjectPage || mainLink;

    const tech = project.tags?.filter((tag) => tag.category && TechConfig.CATEGORIES.includes(tag.category)) || [];
    const skills = project.tags?.filter((tag) => tag.category === 'skill') || [];

    const DateEl = () => (
        <>
            {project.date && (
                <span className="mt-1 text-xs text-muted-foreground">
                    {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                    })}
                </span>
            )}
        </>
    );

    return (
        <Card
            onClick={hasProjectPage ? () => router.get(`/projects/${project.id}`) : mainLink ? (e) => openLink(mainLink, e) : undefined}
            className={cn('group border-secondary transition-all', isClickable && 'cursor-pointer hover:scale-101 hover:shadow-lg')}
        >
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {/* lucide icon */}
                        <div className="rounded-lg p-2">
                            <IconComponent icon_name={project.icon_name} className="h-6 w-6 text-primary" />
                        </div>

                        {/* title and subtitle */}
                        <div>
                            <CardTitle className="mb-1 font-sans text-lg">
                                <H3>
                                    {project.title}
                                    {!!project.featured && <Star className="mx-2 mb-1 inline-block size-4 fill-accent text-accent" />}
                                </H3>
                            </CardTitle>
                            {project.date ? (
                                <DateEl />
                            ) : (
                                !!project.subtitle && <span className="mt-1 text-xs text-muted-foreground">{project.subtitle}</span>
                            )}
                        </div>
                    </div>
                    {isClickable && <ExternalLink className="h-5 w-5 text-primary transition-colors group-hover:text-secondary" />}
                </div>
            </CardHeader>
            <CardContent className="mx-6">
                {/* description */}
                <p className="mb-8 leading-relaxed whitespace-pre-wrap">{project.description}</p>

                {/* skill badges */}
                {!!skills?.length && (
                    <>
                        <div className="mb-4 flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge variant="secondary">{skill.name}</Badge>
                            ))}
                        </div>
                    </>
                )}

                {!!tech.length && (
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <IconList items={tech} />
                    </div>
                )}

                {hasProjectPage && (
                    <Link className="mb-3 inline-block font-semibold uppercase underline-offset-4">
                        Learn More <ChevronRight className="mb-1 inline size-5" />
                        <div className="relative -top-0.5 h-[1.4px] w-0 bg-primary transition-[width] duration-300 group-hover:w-full" />
                    </Link>
                )}

                <div className="flex flex-col gap-2 sm:flex-row">
                    {/* repo button */}
                    {project.repo_link && <GitHubButton url={project.repo_link} />}

                    {/* demo button */}
                    {project.demo_link && <DemoButton url={project.demo_link} />}
                </div>
            </CardContent>
        </Card>
    );
}
