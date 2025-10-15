import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Technologies } from '@/types/models';

export default function TechSkillsSection({ technologies }: { technologies: Technologies }) {
    const frontendTech = technologies.filter((tech) => tech.category === 'frontend');
    const backendTech = technologies.filter((tech) => tech.category === 'backend');
    const techTools = technologies.filter((tech) => tech.category === 'tool');

    return (
        <section id="skills" className="py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {!!technologies.length && (
                    <>
                        <h2 className="mb-12 text-center font-fascinate text-4xl">Technical Skills</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3">
                            {!!frontendTech.length && (
                                <Card className="border-accent">
                                    <CardHeader>
                                        <CardTitle className="font-sans">Frontend Technologies</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex min-w-0 flex-wrap gap-2">
                                            {frontendTech.map((tech) => (
                                                <Badge variant="accent">{tech.name}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                            {!!backendTech.length && (
                                <Card className="border-accent">
                                    <CardHeader>
                                        <CardTitle className="font-sans">Backend Technologies</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex min-w-0 flex-wrap gap-2">
                                            {backendTech.map((tech) => (
                                                <Badge variant="accent">{tech.name}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                            {!!techTools.length && (
                                <Card className="border-accent">
                                    <CardHeader>
                                        <CardTitle className="font-sans">Tools</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex min-w-0 flex-wrap gap-2">
                                            {techTools.map((tech) => (
                                                <Badge variant="accent">{tech.name}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </>
                )}

                <div className="mt-16">
                    <h2 className="mb-12 text-center font-fascinate text-4xl">Professional Experience</h2>
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                        <Card className="border-accent">
                            <CardHeader>
                                <CardTitle className="font-sans text-lg">Multiple Roles - Tavern in the Square</CardTitle>
                                <CardDescription>Framingham, MA | July 2023 - November 2024</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-sm">
                                    Rapidly mastered diverse roles in high-volume restaurant environment, earning increased responsibilities through
                                    demonstrated reliability and quick learning ability.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <strong>Key Transferable Skills:</strong>
                                    </p>
                                    <ul className="list-disc space-y-1 *:ml-[1rem]">
                                        <li>Multitasking & Priority Management</li>
                                        <li>Problem-Solving Under Pressure</li>
                                        <li>Team Collaboration</li>
                                        <li>Customer-Focused Mindset</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-accent">
                            <CardHeader>
                                <CardTitle className="font-sans text-lg">Barkeeper & Service - Neo Bar & Restaurant</CardTitle>
                                <CardDescription>Heidelberg, Germany | December 2024 - Present</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4 text-sm">
                                    Successfully adapted to new cultural and linguistic environment while supporting a dynamic hospitality team.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        <strong>Key Achievements:</strong>
                                    </p>
                                    <ul className="list-disc space-y-1 *:ml-[1rem]">
                                        <li>Cultural adaptability and language skills</li>
                                        <li>Maintained service quality in team transitions</li>
                                        <li>International work experience</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
