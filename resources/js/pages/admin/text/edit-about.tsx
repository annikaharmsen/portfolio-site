import { AboutContentShell } from '@/components/portfolio/about-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, cardStyles, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SiteTextSlot } from '@/types/models';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SiteTextInput, SiteTextTextarea } from './edit';

type AboutCard = {
    heading?: string;
    content?: string;
};

export default function EditAbout({ texts: aboutTexts = {} }: { texts?: SiteTextSlot }) {
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
            MainBody={() => <SiteTextTextarea name="about.main" defaultValue={(aboutTexts?.main as string) || ''} placeholder="Type about me body" />}
            Cards={() => {
                return (
                    <>
                        {cards.map(([key, card], index) => (
                            <Card key={index} className="gap-y-2">
                                <CardHeader>
                                    <CardTitle>
                                        <SiteTextInput
                                            name={`about.cards.${key}.heading`}
                                            defaultValue={card.heading || ''}
                                            placeholder="Enter card heading"
                                        />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SiteTextTextarea
                                        name={`about.cards.${key}.content`}
                                        defaultValue={card.content || ''}
                                        placeholder={`Type "about me" body`}
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
                <SiteTextTextarea
                    name={`about.location`}
                    defaultValue={(aboutTexts.location as string) || ''}
                    placeholder="Enter location statement"
                />
            )}
        />
    );
}
