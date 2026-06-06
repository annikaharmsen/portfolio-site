export type TextSection = 'intro' | 'about' | 'contact' | 'experience';
type SiteTextSlot = {
    [key: string]: SiteTextSlot | string;
};

export type SiteTextPath = `${TextSection}.${string}`;

export type ExperienceTexts = Record<string, never>;

export type SiteTexts = {
    intro?: IntroTexts;
    about?: AboutTexts;
    contact?: ContactTexts;
    experience?: ExperienceTexts;
};

export type SectionTexts = SiteTexts[keyof SiteTexts];

export type IntroTexts = {
    subtitle?: string;
    bio?: string;
};

export type AboutCardTexts = {
    heading?: string;
    content?: string;
};

export type AboutTexts = {
    main?: string;
    cards?: {
        [key: string]: AboutCardTexts;
    };
    location?: string;
};

export type ContactTexts = {
    main?: string;
    email?: string;
    location?: string;
    callout?: string;
};

import { Experience } from '@/types/models';

export type TextSectionComponent<T extends SectionTexts = SectionTexts> = ({
    texts,
    experiences,
}: {
    texts?: T;
    experiences?: Experience[];
}) => ReactElement;
