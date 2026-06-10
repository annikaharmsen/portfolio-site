import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Experience, Experiences } from '@/types/models';
import Markdown from '../markdown';

function formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function ExperienceCard({ experience }: { experience: Experience }) {
    const dateRange = `${formatDate(experience.start_date)} - ${
        experience.end_date ? formatDate(experience.end_date) : 'Present'
    }`;

    return (
        <Card className="border-none bg-background shadow">
            <CardHeader>
                <CardTitle className="font-sans text-lg">
                    {experience.title} - {experience.company}
                </CardTitle>
                <CardDescription>
                    {experience.location && `${experience.location} | `}{dateRange}
                </CardDescription>
            </CardHeader>
            {experience.details && (
                <CardContent className="text-sm">
                    <Markdown headingLevelOffset={3}>{experience.details}</Markdown>
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
