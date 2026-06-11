import EditAbout from '@/components/sections/edit-about';
import EditContact from '@/components/sections/edit-contact';
import EditIntro from '@/components/sections/edit-intro';
import ShowAbout from '@/components/sections/show-about';
import ShowContact from '@/components/sections/show-contact';
import ShowIntro from '@/components/sections/show-intro';
import { SectionTexts, TextSectionComponent } from '@/types/site-texts';

export type ModelType = 'Project' | 'Tag';
export type ModelURI = '/projects' | '/tags';

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

export interface TagConfigInterface extends ModelConfigInterface {
    TYPE: 'Tag';
    CATEGORIES: readonly TagCategory[];
    BASE_URI: '/tags';
}

export const TagConfig: TagConfigInterface = {
    TYPE: 'Tag',
    CATEGORIES: [...TAG_CATEGORIES],
    BASE_URI: '/tags',
} as const;

// text sections
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
