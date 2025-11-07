import { AboutContentShell } from '@/components/portfolio/about-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, cardStyles, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { SiteTextSlot } from '@/types/models';
import { Plus } from 'lucide-react';
import { FocusEventHandler, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type AboutCard = {
    heading?: string;
    content?: string;
};

export default function EditAbout({ aboutTexts, handleFieldBlur }: { aboutTexts: SiteTextSlot; handleFieldBlur: FocusEventHandler }) {
    const [cards, setCards] = useState(Object.values(aboutTexts.cards || {}) as AboutCard[]);

    // sync cards state when aboutTexts changes
    useEffect(() => {
        setCards(Object.values(aboutTexts.cards || {}) as AboutCard[]);
    }, [aboutTexts]);

    return (
        <AboutContentShell
            MainBody={() => (
                <TextareaAutosize
                    name="about.main"
                    defaultValue={(aboutTexts?.main as string) || ''}
                    onBlur={handleFieldBlur}
                    placeholder="Type about me body"
                    className={cn(textAreaStyles, 'size-full resize-none text-lg!')}
                />
            )}
            Cards={() => {
                return (
                    <>
                        {cards.map((card, index) => (
                            <Card key={index} className="gap-y-2">
                                <CardHeader>
                                    <CardTitle>
                                        <Input
                                            name={`about.cards.card_${index}.heading`}
                                            defaultValue={card.heading || ''}
                                            onBlur={handleFieldBlur}
                                            placeholder="Enter card heading"
                                            type="text"
                                            className="placeholder:text-foreground/60"
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TextareaAutosize
                                        name={`about.cards.card_${index}.content`}
                                        defaultValue={card.content || ''}
                                        onBlur={handleFieldBlur}
                                        placeholder={`Type "about me" body`}
                                        className={cn(textAreaStyles, 'w-full resize-none')}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            onClick={() => {
                                setCards([...cards, {}]);
                            }}
                            variant="ghost"
                            className={cn(cardStyles, 'w-full hover:bg-muted hover:text-foreground')}
                        >
                            <Plus />
                        </Button>
                    </>
                );
            }}
        />
    );
}
