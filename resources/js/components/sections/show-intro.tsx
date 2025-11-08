import { IntroTexts } from '@/types/site-texts';
import { useEffect, useState } from 'react';
import { ResumeButton, ViewWorkButton } from '../app-buttons';
import IntroShell from '../intro-shell';
import Markdown from '../markdown';

export default function ShowIntro({ texts }: { texts: IntroTexts }) {
    const [resumeExists, setResumeExists] = useState(false);

    useEffect(() => {
        try {
            fetch('/resume', { method: 'HEAD' })
                .then((response) => (response.ok && response.headers.get('content-type')) || '')
                .then((contentType) => contentType.includes('application/pdf'))
                .then((isDocument) => setResumeExists(isDocument));
        } catch {
            setResumeExists(false);
        }
    }, []);

    return (
        <IntroShell
            Subtitle={() => <span className={'text-lg font-bold sm:text-xl'}>{texts.subtitle}</span>}
            Bio={() => <Markdown>{texts.bio || ''}</Markdown>}
            ViewWorkButton={() => <ViewWorkButton href="#projects" />}
            {...(resumeExists && { ResumeButton: () => <ResumeButton href="/resume" /> })}
        />
    );
}
