import { IntroArticle, ResumeButton, Title, ViewWorkButton } from '@/components/portfolio/header-content';
import { Input } from '@/components/ui/input';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { SiteTextSlot } from '@/types/models';
import { FocusEventHandler } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function EditIntro({ texts: introTexts = {}, onFieldBlur }: { texts?: SiteTextSlot; onFieldBlur: FocusEventHandler }) {
    return (
        <div className="mt-28 w-full text-right">
            <Title />

            <IntroArticle>
                <Input
                    name="intro.subtitle"
                    defaultValue={(introTexts.subtitle as string) || ''}
                    onBlur={onFieldBlur}
                    placeholder="Enter professional title"
                    type="text"
                    className={cn('text-lg! font-bold sm:text-xl!', 'mb-2 placeholder:text-foreground/60')}
                />
                <TextareaAutosize
                    name="intro.bio"
                    defaultValue={(introTexts.bio as string) || ''}
                    onBlur={onFieldBlur}
                    placeholder="Enter brief description"
                    className={cn(textAreaStyles, 'min-h-0! w-full resize-none overflow-hidden!')}
                />
            </IntroArticle>

            <div className="flex flex-col flex-wrap justify-end gap-3 sm:flex-row sm:gap-4">
                <ViewWorkButton disabled />
                <ResumeButton disabled />
            </div>
        </div>
    );
}
