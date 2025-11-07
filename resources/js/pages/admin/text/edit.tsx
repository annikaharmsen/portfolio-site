import { IntroArticle, ResumeButton, Title, ViewWorkButton } from '@/components/portfolio/header-content';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Section, SiteTextPath, SiteTexts } from '@/types/models';
import { router } from '@inertiajs/react';
import { FocusEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditAbout from './edit-about';

export default function Edit({ section = 'intro', texts }: { section?: Section; texts: SiteTexts }) {
    console.log(texts);
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
                    <TabsTrigger value="intro">Intro</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="intro">
                    <Card>
                        <CardContent>
                            <div className="mt-28 w-full text-right">
                                <Title />

                                <IntroArticle>
                                    <Input
                                        name="intro.subtitle"
                                        defaultValue={(texts?.intro?.subtitle as string) || ''}
                                        onBlur={handleBlur}
                                        placeholder="Enter professional title"
                                        type="text"
                                        className={cn('text-lg! font-bold sm:text-xl!', 'mb-2 placeholder:text-foreground/60')}
                                    />
                                    <TextareaAutosize
                                        name="intro.bio"
                                        defaultValue={(texts?.intro?.bio as string) || ''}
                                        onBlur={handleBlur}
                                        placeholder="Enter brief description"
                                        className={cn(textAreaStyles, 'w-full resize-none')}
                                    />
                                </IntroArticle>

                                <div className="flex flex-col flex-wrap justify-end gap-3 sm:flex-row sm:gap-4">
                                    <ViewWorkButton disabled />
                                    <ResumeButton disabled />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="about">
                    <Card>
                        <CardContent>
                            <EditAbout aboutTexts={texts.about || {}} handleFieldBlur={handleBlur} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="contact">
                    <Card>
                        <CardContent></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
