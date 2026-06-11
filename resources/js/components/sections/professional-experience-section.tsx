import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Experience, Experiences } from '@/types/models';

function ExperienceCard({ experience }: { experience: Experience }) {
    return (
        <Card className="border-none bg-background shadow">
            <CardHeader>
                <CardTitle className="font-sans text-lg">
                    {experience.title} - {experience.company}
                </CardTitle>
                <CardDescription>
                    {experience.location && `${experience.location} | `}{experience.formatted_date_ranges}
                </CardDescription>
            </CardHeader>
            {experience.bullets && experience.bullets.length > 0 && (
                <CardContent className="text-sm">
                    <ul className="list-disc space-y-1 pl-4">
                        {experience.bullets.map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                        ))}
                    </ul>
                </CardContent>
            )}
        </Card>
    );
}

export default function ProfessionalExperienceSection({ experiences }: { experiences: Experiences }) {
    return (
        <section id="experience" className="bg-muted py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 text-center text-4xl uppercase">Professional Experience</h2>
                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                    {experiences.map((exp) => (
                        <ExperienceCard key={exp.id} experience={exp} />
                    ))}
                </div>
            </div>
        </section>
    );
}
