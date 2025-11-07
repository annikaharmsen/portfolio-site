import { IntroArticle, ResumeButton, Title, ViewWorkButton } from '@/components/portfolio/header-content';
import { SiteTextSlot } from '@/types/models';
import { SiteTextInput, SiteTextTextarea } from './edit';

export default function EditIntro({ texts: introTexts = {} }: { texts?: SiteTextSlot }) {
    return (
        <div className="mt-28 w-full text-right">
            <Title />

            <IntroArticle>
                <SiteTextInput
                    name="intro.subtitle"
                    defaultValue={(introTexts.subtitle as string) || ''}
                    placeholder="Enter professional title"
                    className="text-lg! font-bold sm:text-xl!"
                />
                <SiteTextTextarea name="intro.bio" defaultValue={(introTexts.bio as string) || ''} placeholder="Enter brief description" />
            </IntroArticle>

            <div className="flex flex-col flex-wrap justify-end gap-3 sm:flex-row sm:gap-4">
                <ViewWorkButton disabled />
                <ResumeButton disabled />
            </div>
        </div>
    );
}
