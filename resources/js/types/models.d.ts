import { IconName } from '@/components/icon-selector-dropdown';
import { TagCategory } from '@/config/config';

export type Project = {
    //columns
    id: number;
    icon_name: IconName;
    title: string;
    subtitle: string;
    description: string;
    repo_link?: string;
    demo_link?: string;
    featured: boolean;
    hidden: boolean;
    date?: string;
    bullets?: string[] | null;
    category?: 'projects' | 'personal' | null;
    label?: string | null;
    // relations
    tags?: Tags;
    hero_sections?: ProjectHeroSections;
};
export type Projects = Project[];

export type ProjectHeroSection = {
    id: number;

    //relations
    project?: Project;
    image?: Image;

    //columns
    heading: string;
    text: string;
};
export type ProjectHeroSections = ProjectHeroSection[];

export type Image = {
    id: number;
    url: string;
    alt?: string;
};
export type Images = Image[];

export type Tag = {
    //columns
    id: number;
    icon_name: IconName;
    name: string;
    category?: TagCategory;
    skill_group_id?: number | null;
    // relations
    projects?: Projects;
    skill_group?: SkillGroup;
    // counts
    projects_count: number;
    // exists
    projects_exists: boolean;
};
export type Tags = Tag[];

export interface SkillGroup {
    id: number;
    name: string;
    sort_order: number;
    tags?: Tags;
}

export type SkillGroups = SkillGroup[];

export type User = {
    // columns
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    password?: string;
    remember_token?: string | null;
    created_at: string | null;
    updated_at: string | null;
    // relations
    notifications: DatabaseNotifications;
    // counts
    notifications_count: number;
    // exists
    notifications_exists: boolean;
};
export type Users = User[];

export interface Experience {
    id: number;
    title: string;
    company: string;
    location: string | null;
    date_ranges: { start: string; end: string | null }[];
    bullets: string[] | null;
    formatted_date_ranges: string;
    sort_order: number;
}

export type Experiences = Experience[];

export interface Education {
    id: number;
    title: string;
    institution: string;
    graduation_date: string;
    gpa: string | null;
    bullets: string[] | null;
    sort_order: number;
}

export type Educations = Education[];
