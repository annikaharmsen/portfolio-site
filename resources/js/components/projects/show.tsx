import TechnologiesIndex from '@/components/technologies/index';
import { getIcon } from '@/lib/generated-icons';
import { Project } from '@/types/types';
import { ExternalLink, Github } from 'lucide-react';
import SkillsIndex from '../skills/index';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function Show({ project }: { project: Project }) {
    return (
        <a key={project.title} href={project.demo_link ?? project.repo_link ?? '#'} target="_blank" rel="noopener noreferrer">
            <Card className="group border-sage bg-white transition-shadow hover:shadow-lg">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {/* lucide icon */}
                            <div className="rounded-lg bg-terracotta/10 p-2">
                                {(() => {
                                    const IconComponent = getIcon(project.icon_name);
                                    return <IconComponent className="h-6 w-6 text-rust" />;
                                })()}
                            </div>

                            {/* title and subtitle */}
                            <div>
                                <CardTitle className="mb-1 font-sans text-lg">{project.title}</CardTitle>
                                {project.date && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {new Date(project.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        })}
                                    </p>
                                )}
                            </div>
                        </div>

                        <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-terracotta" />
                    </div>
                </CardHeader>
                <CardContent className="mx-6 space-y-4">
                    {/* description */}
                    <p className="leading-relaxed text-muted-foreground">{project.description}</p>

                    {/* skill list */}
                    {project.skills && <SkillsIndex skills={project.skills} />}

                    {/* tech stack badges */}
                    {project.technologies && <TechnologiesIndex technologies={project.technologies} />}

                    <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                        {/* repo button */}
                        <a className={!project.repo_link ? 'hidden' : ''} href={project.repo_link ?? '#'} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-transparent transition-all duration-300 hover:border-sage hover:bg-sage hover:text-white"
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
                                className="border-primary bg-transparent transition-all duration-300 hover:border-rust hover:bg-rust hover:text-white"
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
