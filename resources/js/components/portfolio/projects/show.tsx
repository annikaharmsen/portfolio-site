import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/lib/generated-icons';
import { Project } from '@/types/models';
import { ExternalLink, Github } from 'lucide-react';
import SkillsIndex from '../skills/index';
import TechnologiesIndex from '../technologies/index';

export function ShowProject({ project, asPreview }: { project: Project; asPreview?: boolean }) {
    const DateEl = () => (
        <>
            {project.date && (
                <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(project.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                    })}
                </p>
            )}
        </>
    );

    return (
        <a key={project.title} href={project.demo_link ?? project.repo_link ?? '#'} target="_blank" rel="noopener noreferrer">
            <Card className="group transition-shadow hover:shadow-lg">
                <CardHeader className={!asPreview ? 'pb-4' : ''}>
                    <div className="flex items-start justify-between">
                        {!asPreview ? (
                            <>
                                <div className="flex items-center gap-3">
                                    {/* lucide icon */}
                                    <div className="rounded-lg p-2">
                                        {(() => {
                                            const IconComponent = getIcon(project.icon_name);
                                            return <IconComponent className="h-6 w-6 text-secondary" />;
                                        })()}
                                    </div>

                                    {/* title and subtitle */}
                                    <div>
                                        <CardTitle className="mb-1 font-sans text-lg">{project.title}</CardTitle>
                                        <Date />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="ml-6">
                                <DateEl />
                            </div>
                        )}

                        <ExternalLink className="h-5 w-5 text-secondary transition-colors group-hover:text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="mx-6 space-y-4">
                    {/* description */}
                    <p className="leading-relaxed">{project.description}</p>

                    {/* skill list */}
                    {project.skills && <SkillsIndex skills={project.skills} />}

                    {/* tech stack badges */}
                    {project.technologies && <TechnologiesIndex technologies={project.technologies} />}

                    <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                        {/* repo button */}
                        <a className={!project.repo_link ? 'hidden' : ''} href={project.repo_link ?? '#'} target="_blank" rel="noopener noreferrer">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-foreground bg-transparent transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                            </Button>
                        </a>

                        {/* demo button */}
                        <a className={!project.demo_link ? 'hidden' : ''} href={project.demo_link ?? '#'} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-foreground bg-transparent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}
