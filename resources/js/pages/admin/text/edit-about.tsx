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

export default function EditAbout({ texts: aboutTexts = {}, onFieldBlur }: { texts?: SiteTextSlot; onFieldBlur: FocusEventHandler }) {
    const [cards, setCards] = useState(Object.entries(aboutTexts.cards || {}) as [string, AboutCard][]);

    // sync cards state when aboutTexts changes
    useEffect(() => {
        setCards(Object.entries(aboutTexts.cards || {}) as [string, AboutCard][]);
    }, [aboutTexts]);

    const addCard = () => {
        const lastCard = cards[cards.length - 1];
        const lastCardKey = lastCard ? parseFloat(lastCard[0]) : -1;

        const newCard: [string, AboutCard] = [`${lastCardKey + 1}`, {}];

        setCards([...cards, newCard]);
    };

    return (
        <AboutContentShell
            MainBody={() => (
                <TextareaAutosize
                    name="about.main"
                    defaultValue={(aboutTexts?.main as string) || ''}
                    onBlur={onFieldBlur}
                    placeholder="Type about me body"
                    className={cn(textAreaStyles, 'w-full resize-none overflow-hidden! text-lg!')}
                />
            )}
            Cards={() => {
                return (
                    <>
                        {cards.map(([key, card], index) => (
                            <Card key={index} className="gap-y-2">
                                <CardHeader>
                                    <CardTitle>
                                        <Input
                                            name={`about.cards.${key}.heading`}
                                            defaultValue={card.heading || ''}
                                            onBlur={onFieldBlur}
                                            placeholder="Enter card heading"
                                            type="text"
                                            className="placeholder:text-foreground/60"
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TextareaAutosize
                                        name={`about.cards.${key}.content`}
                                        defaultValue={card.content || ''}
                                        onBlur={onFieldBlur}
                                        placeholder={`Type "about me" body`}
                                        className={cn(textAreaStyles, 'w-full resize-none overflow-hidden!')}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                        <Button onClick={addCard} variant="ghost" className={cn(cardStyles, 'w-full grow-0! hover:bg-muted hover:text-foreground')}>
                            <Plus />
                        </Button>
                    </>
                );
            }}
            Location={() => (
                <TextareaAutosize
                    name={`about.location`}
                    defaultValue={(aboutTexts.location as string) || ''}
                    onBlur={onFieldBlur}
                    placeholder="Enter location statement"
                    className={cn(textAreaStyles, 'w-full resize-none overflow-hidden!')}
                />
            )}
        />
    );
}
