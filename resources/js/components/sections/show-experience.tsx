import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Experience } from '@/types/models';
import Markdown from '../markdown';

function formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function ExperiencePreviewCard({ experience }: { experience: Experience }) {
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

export default function ShowExperience({ experiences = [] }: { experiences?: Experience[] }) {
    return (
        <div className="space-y-6">
            {experiences.map((exp) => (
                <ExperiencePreviewCard key={exp.id} experience={exp} />
            ))}
            {experiences.length === 0 && (
                <p className="text-muted-foreground text-center">no experience records yet</p>
            )}
        </div>
    );
}
