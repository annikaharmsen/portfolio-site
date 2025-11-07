import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { textAreaStyles } from '@/components/ui/textarea';
import { SectionComponent } from '@/config/config';
import { cn } from '@/lib/utils';
import { Section, SiteTextPath, SiteTexts } from '@/types/models';
import { router } from '@inertiajs/react';
import { ComponentProps, FocusEventHandler, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditAbout from './edit-about';
import EditContact from './edit-contact';
import EditIntro from './edit-intro';

const sections: [Section, SectionComponent][] = [
    ['intro', EditIntro],
    ['about', EditAbout],
    ['contact', EditContact],
];

export default function Edit({ section: defaultSection = 'intro', texts }: { section?: Section; texts: SiteTexts }) {
    const [section, setSection] = useState<Section>(defaultSection);

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
                                <Section texts={texts[value]} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </>
    );
}

const updatePath = (path: SiteTextPath, text: string) => {
    router.put('/text', { path: path, text: text });
};

const handleBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    if (event.target.value !== event.target.defaultValue) updatePath(event.target.name as SiteTextPath, event.target.value);
};

interface SiteTextFieldProps {
    name: string;
    placeholder: string;
}

export const SiteTextInput = (props: SiteTextFieldProps & ComponentProps<typeof Input>) => (
    <Input type="text" {...props} onBlur={handleBlur} className={cn('placeholder:text-foreground/60', props.className)} />
);

export const SiteTextTextarea = (props: SiteTextFieldProps & ComponentProps<typeof TextareaAutosize>) => (
    <TextareaAutosize {...props} onBlur={handleBlur} className={cn(textAreaStyles, 'w-full resize-none overflow-hidden!', props.className)} />
);
