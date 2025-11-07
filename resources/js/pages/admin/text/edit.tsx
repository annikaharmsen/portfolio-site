import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Section, SiteTextPath, SiteTexts, SiteTextSlot } from '@/types/models';
import { router } from '@inertiajs/react';
import { FocusEventHandler, ReactElement, useState } from 'react';
import EditAbout from './edit-about';
import EditContact from './edit-contact';
import EditIntro from './edit-intro';

export type SectionComponent = ({ texts, onFieldBlur }: { texts?: SiteTextSlot | undefined; onFieldBlur: FocusEventHandler }) => ReactElement;

export default function Edit({ section: defaultSection = 'intro', texts }: { section?: Section; texts: SiteTexts }) {
    const [section, setSection] = useState<Section>(defaultSection);
    const sections: [Section, SectionComponent][] = [
        ['intro', EditIntro],
        ['about', EditAbout],
        ['contact', EditContact],
    ];
    const updatePath = (path: SiteTextPath, text: string) => {
        router.put('/text', { path: path, text: text });
    };

    const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        if (event.target.value !== event.target.defaultValue) updatePath(event.target.name as SiteTextPath, event.target.value);
    };

    return (
        <>
            <Tabs defaultValue={section} className="min-h-full">
                <TabsList>
                    <TabsTrigger onClick={() => setSection('intro')} value="intro">
                        Intro
                    </TabsTrigger>
                    <TabsTrigger onClick={() => setSection('about')} value="about">
                        About
                    </TabsTrigger>
                    <TabsTrigger onClick={() => setSection('contact')} value="contact">
                        Contact
                    </TabsTrigger>
                </TabsList>
                {sections.map(([value, Section]) => (
                    <TabsContent value={value}>
                        <Card>
                            <CardContent>
                                <Section texts={texts[value]} onFieldBlur={handleBlur} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
}
