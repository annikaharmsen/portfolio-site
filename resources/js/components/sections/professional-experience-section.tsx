import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function ProfessionalExperienceSection() {
    return (
        <section id="experience" className="bg-muted py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-4xl uppercase">Professional Experience</h2>
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                    <Card className="border-none bg-background shadow">
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

                    <Card className="border-none bg-background shadow">
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
        </section>
    );
}
