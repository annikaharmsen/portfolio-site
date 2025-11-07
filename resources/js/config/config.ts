import AboutSection from '@/components/portfolio/about-section';
import ContactSection from '@/components/portfolio/contact-section';
import HeaderContent from '@/components/portfolio/header-content';
import EditAbout from '@/pages/admin/text/edit-about';
import EditContact from '@/pages/admin/text/edit-contact';
import EditIntro from '@/pages/admin/text/edit-intro';
import { SiteTextSlot } from '@/types/models';
import { ReactElement } from 'react';

export type ModelType = 'Project' | TagType;
export type TagType = 'Tag' | 'Technology' | 'Skill';

export type ModelURI = '/projects' | TagURI;
export type TagURI = '/tags' | '/technologies' | '/skills';

const TAG_CATEGORIES = ['frontend', 'backend', 'tool', 'skill'] as const;
export type TagCategory = (typeof TAG_CATEGORIES)[number];

export interface ModelConfigInterface {
    TYPE: ModelType;
    BASE_URI: ModelURI;
}

export const ProjectConfig: ModelConfigInterface = {
    TYPE: 'Project',
    BASE_URI: '/projects',
};

export interface TagConfigInterface<T extends TagCategory[] = TagCategory[]> extends ModelConfigInterface {
    TYPE: TagType;
    CATEGORIES: T;
    BASE_URI: TagURI;
}

export const TagConfig: TagConfigInterface = {
    TYPE: 'Tag',
    CATEGORIES: [...TAG_CATEGORIES],
    BASE_URI: '/tags',
} as const;

export const TechConfig: TagConfigInterface = {
    TYPE: 'Technology',
    CATEGORIES: ['frontend', 'backend', 'tool'],
    BASE_URI: '/technologies',
} as const;

export const SkillConfig: TagConfigInterface = {
    TYPE: 'Skill',
    CATEGORIES: ['skill'],
    BASE_URI: '/skills',
} as const;

export type TechCategory = (typeof TechConfig.CATEGORIES)[number];
export type SkillCategory = (typeof SkillConfig.CATEGORIES)[number];

// Sections
export type SectionComponent = ({ texts }: { texts?: SiteTextSlot | undefined }) => ReactElement;
export interface SectionConfigInterface {
    EDIT: SectionComponent;
    SHOW: SectionComponent;
}

export const SectionConfigs = {
    intro: {
        EDIT: EditIntro,
        SHOW: HeaderContent,
    },
    about: {
        EDIT: EditAbout,
        SHOW: AboutSection,
    },
    contact: {
        EDIT: EditContact,
        SHOW: ContactSection,
    },
};
