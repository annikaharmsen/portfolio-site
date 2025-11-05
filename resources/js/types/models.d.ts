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
    date?: string;
    // relations
    tags?: Tags;
    hero_sections?: ProjectHeroSections;
    // counts
    skills_count: number;
    technologies_count: number;
    // exists
    skills_exists: boolean;
    technologies_exists: boolean;
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
    // relations
    projects?: Projects;
    // counts
    projects_count: number;
    // exists
    projects_exists: boolean;
};
export type Tags = Tag[];

export type User = {
    // columns
    id: number;
    name: string;
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

export type Section = 'intro' | 'about' | 'skills' | 'projects' | 'contact';
