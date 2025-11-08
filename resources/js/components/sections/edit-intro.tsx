import { IntroTexts } from '@/types/site-texts';
import { SiteTextInput, SiteTextTextarea } from '../../pages/admin/sections/edit';
import { ResumeButton, ViewWorkButton } from '../app-buttons';
import IntroShell from '../intro-shell';

export default function EditIntro({ texts: introTexts = {} }: { texts?: IntroTexts }) {
    return (
        <IntroShell
            Subtitle={() => (
                <SiteTextInput
                    name="intro.subtitle"
                    defaultValue={(introTexts.subtitle as string) || ''}
                    placeholder="Enter professional title"
                    className="text-lg! font-bold sm:text-xl!"
                />
            )}
            Bio={() => (
                <SiteTextTextarea
                    name="intro.bio"
                    defaultValue={(introTexts.bio as string) || ''}
                    placeholder="Enter brief description"
                    className="text-right"
                />
            )}
            ViewWorkButton={ViewWorkButton}
            ResumeButton={ResumeButton}
        />
    );
}
