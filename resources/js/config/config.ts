import EditAbout from '@/components/sections/edit-about';
import EditContact from '@/components/sections/edit-contact';
import EditIntro from '@/components/sections/edit-intro';
import ShowAbout from '@/components/sections/show-about';
import ShowContact from '@/components/sections/show-contact';
import ShowIntro from '@/components/sections/show-intro';
import { SectionTexts, TextSectionComponent } from '@/types/site-texts';

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

// Text Sections
export interface SectionConfigInterface<T extends SectionTexts = SectionTexts> {
    EditComponent: TextSectionComponent<T>;
    ShowComponent: TextSectionComponent<T>;
}

export const SectionConfigs = {
    intro: {
        EditComponent: EditIntro,
        ShowComponent: ShowIntro,
    },
    about: {
        EditComponent: EditAbout,
        ShowComponent: ShowAbout,
    },
    contact: {
        EditComponent: EditContact,
        ShowComponent: ShowContact,
    },
} as const;
