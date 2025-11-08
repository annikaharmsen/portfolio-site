import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { textAreaStyles } from '@/components/ui/textarea';
import { SectionConfigs } from '@/config/config';
import { cn } from '@/lib/utils';
import { SiteTextPath, SiteTexts, TextSection } from '@/types/site-texts';
import { router } from '@inertiajs/react';
import { ComponentProps, FocusEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function Edit({ section = 'intro', texts }: { section?: TextSection; texts: SiteTexts }) {
    const { EditComponent, ShowComponent } = SectionConfigs[section];
    return (
        <>
            <Tabs defaultValue="edit" className="min-h-full">
                <TabsList>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="show">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value={'edit'}>
                    <Card>
                        <CardContent>
                            <EditComponent texts={texts[section]} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value={'show'}>
                    <Card>
                        <CardContent>
                            <ShowComponent texts={texts[section] || {}} />
                        </CardContent>
                    </Card>
                </TabsContent>
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
