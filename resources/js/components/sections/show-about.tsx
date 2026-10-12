import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMonthYear } from '@/lib/utils';
import { Education, Highlight } from '@/types/models';
import { AboutTexts } from '@/types/site-texts';
import { AboutShell } from '../about-shell';
import Markdown from '../markdown';

function EducationCard({ education }: { education: Education }) {
    const gradYear = formatMonthYear(education.graduation_date);

    return (
        <Card className="border-none bg-background">
            <CardHeader>
                <CardTitle className="text-base font-semibold">{education.institution}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">{education.title}</p>
                <p className="text-xs text-muted-foreground">
                    {gradYear}
                    {education.gpa ? ` · ${education.gpa} GPA` : ''}
                </p>
                {education.bullets && education.bullets.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">{education.bullets.join(', ')}</p>
                )}
            </CardContent>
        </Card>
    );
}

function HighlightsCard({ highlights }: { highlights: Highlight[] }) {
    return (
        <Card className="border-none bg-background">
            <CardHeader>
                <CardTitle className="text-base font-semibold">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                    {highlights.map((highlight) => (
                        <li key={highlight.id}>{highlight.text}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default function ShowAbout({ texts, educations, highlights }: { texts: AboutTexts; educations?: Education[]; highlights?: Highlight[] }) {
    return (
        <AboutShell
            MainBody={() => <Markdown>{texts.main}</Markdown>}
            Cards={() => (
                <>
                    {highlights && highlights.length > 0 && <HighlightsCard highlights={highlights} />}
                    {educations?.map((edu) => (
                        <EducationCard key={edu.id} education={edu} />
                    ))}
                    {Object.keys(texts.cards || {}).map((key) => (
                        <Card key={key} className="border-none bg-background">
                            <CardHeader>
                                <CardTitle>
                                    <Markdown>{texts.cards?.[key].heading}</Markdown>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Markdown>{texts.cards?.[key].content || ''}</Markdown>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
            Location={() => <>{texts.location && <Markdown>{texts.location}</Markdown>}</>}
        />
    );
}
