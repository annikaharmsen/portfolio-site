export type TextSection = 'intro' | 'about' | 'contact';
type SiteTextSlot = {
    [key: string]: SiteTextSlot | string;
};

export type SiteTextPath = `${TextSection}.${string}`;

export type SectionTexts = IntroTexts | AboutTexts | ContactTexts;

export type SiteTexts = {
    intro?: IntroTexts;
    about?: AboutTexts;
    contact?: ContactTexts;
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

export type TextSectionComponent<T extends SectionTexts = SectionTexts> = ({ texts }: { texts?: T }) => ReactElement;
