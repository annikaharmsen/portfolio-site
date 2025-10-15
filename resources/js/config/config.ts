export interface TagConfig {
    readonly CATEGORIES: readonly string[];
    readonly BASE_URI: string;
}

export const TechnologyConfig = {
    CATEGORIES: ['frontend', 'backend', 'tool'],
    BASE_URI: 'technologies',
} as const;

export const SkillConfig = {
    CATEGORIES: [] as string[],
    BASE_URI: 'skills',
} as const;

export type TechnologyCategory = (typeof TechnologyConfig.CATEGORIES)[number];
export type SkillCategory = (typeof SkillConfig.CATEGORIES)[number];
