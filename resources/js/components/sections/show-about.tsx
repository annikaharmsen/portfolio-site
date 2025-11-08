import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AboutTexts } from '@/types/site-texts';
import { AboutShell } from '../about-shell';
import Markdown from '../markdown';

export default function ShowAbout({ texts }: { texts: AboutTexts }) {
    console.log(texts);
    return (
        <AboutShell
            MainBody={() => <Markdown>{texts.main}</Markdown>}
            Cards={() => (
                <>
                    {Object.keys(texts.cards || {}).map((key) => (
                        <Card>
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
