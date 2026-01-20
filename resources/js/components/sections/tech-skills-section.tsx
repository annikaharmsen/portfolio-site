import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags } from '@/types/models';
import IconComponent from '../icon-component';
import IconList from '../portfolio/icon-list';

export default function TechSkillsSection({ tags }: { tags: Tags }) {
    const frontend = tags.filter((tag) => tag.category === 'frontend');
    const backend = tags.filter((tag) => tag.category === 'backend');
    const tools = tags.filter((tag) => tag.category === 'tool');
    const skills = tags.filter((tag) => tag.category === 'skill');
    const tech = [
        {
            name: 'Frontend Technologies',
            items: frontend,
        },
        {
            name: 'Backend Technologies',
            items: backend,
        },
        {
            name: 'Tools',
            items: tools,
        },
    ];

    return (
        <section id="skills" className="py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {!!tags.length && (
                    <>
                        <h2 className="mb-12 text-center text-4xl uppercase">Technical Skills</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
                            {tech.map((category) => (
                                <div key={category.name}>
                                    {!!category.items.length && (
                                        <Card className="border-accent">
                                            <CardHeader>
                                                <CardTitle className="font-sans">{category.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex min-w-0 flex-wrap gap-2">
                                                    {category.items.map((tech) => (
                                                        <Badge key={tech.name} className="text-sm" variant="accent">
                                                            <IconComponent icon_name={tech.icon_name} />
                                                            {tech.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ))}
                        </div>
                        {!!skills.length && (
                            <div className="mt-12 flex flex-wrap justify-center-safe gap-2">
                                <IconList items={skills} className="rounded border border-accent px-2 text-lg text-foreground" />
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
