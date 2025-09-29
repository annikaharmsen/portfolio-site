import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/types/models';
import { ExternalLink, Github, Star } from 'lucide-react';
import IconComponent from '../icon-component';
import { Badge } from '../ui/badge';
import IconList from './icon-list';

export default function ProjectCard({ project }: { project: Project }) {
    const mainLink = project.demo_link || project.repo_link || null;

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

    const openLink = (link: string, e?: React.MouseEvent) => {
        e?.stopPropagation();

        window.open(link);
    };

    return (
        <Card
            onClick={
                mainLink
                    ? (e) => {
                          openLink(mainLink, e);
                      }
                    : undefined
            }
            className="group cursor-pointer transition-all hover:scale-101 hover:shadow-lg"
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
                                {project.title}
                                {!!project.featured && <Star className="mx-2 mb-1 inline-block size-4 fill-accent text-accent" />}
                            </CardTitle>
                            <DateEl />
                        </div>
                    </div>
                    {project.demo_link ||
                        (project.repo_link && <ExternalLink className="h-5 w-5 text-primary transition-colors group-hover:text-secondary" />)}
                </div>
            </CardHeader>
            <CardContent className="mx-6 space-y-4">
                {/* description */}
                <p className="leading-relaxed whitespace-pre-wrap">{project.description}</p>

                {/* tech list */}
                {!!project.technologies?.length && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <IconList items={project.technologies} />
                    </div>
                )}

                {/* skill badges */}
                {!!project.skills?.length && (
                    <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                            <Badge variant="secondary">{skill.name}</Badge>
                        ))}
                    </div>
                )}

                <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                    {/* repo button */}
                    {project.repo_link && (
                        <Button
                            onClick={(e) => openLink(project.repo_link || '#', e)}
                            size="sm"
                            variant="outline"
                            className="cursor-pointer border-foreground bg-transparent transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                        >
                            <Github className="mr-2 h-4 w-4" />
                            View Code
                        </Button>
                    )}

                    {/* demo button */}
                    {project.demo_link && (
                        <Button
                            onClick={(e) => openLink(project.demo_link || '#', e)}
                            variant="outline"
                            size="sm"
                            className="cursor-pointer border-foreground bg-transparent transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                        >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
