import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillGroups } from '@/types/models';
import IconComponent from '../icon-component';

export default function TechSkillsSection({ skillGroups }: { skillGroups: SkillGroups }) {
    return (
        <section id="skills" className="py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {!!skillGroups.length && (
                    <>
                        <h2 className="mb-12 text-center text-4xl uppercase">Technical Skills</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
                            {skillGroups.map((group) => (
                                <div key={group.id}>
                                    {!!group.tags?.length && (
                                        <Card className="border-accent">
                                            <CardHeader>
                                                <CardTitle className="font-sans">{group.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex min-w-0 flex-wrap gap-2">
                                                    {group.tags.map((tag) => (
                                                        <Badge key={tag.id} className="text-sm" variant="accent">
                                                            <IconComponent icon_name={tag.icon_name} />
                                                            {tag.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
