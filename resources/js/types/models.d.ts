import { IconName } from '@/components/icon-selector-dropdown';

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
    skills?: Skills;
    technologies?: Technologies;
    // counts
    skills_count: number;
    technologies_count: number;
    // exists
    skills_exists: boolean;
    technologies_exists: boolean;
};
export type Projects = Project[];

export type ProjectTag = {
    //columns
    id: number;
    icon_name: IconName;
    name: string;
    category?: string;
    // relations
    projects?: Projects;
    // counts
    projects_count: number;
    // exists
    projects_exists: boolean;
};
export type ProjectTags = ProjectTag[];

export type Skill = ProjectTag;
export type Skills = Skill[];

export type Technology = ProjectTag & { category?: 'backend' | 'frontend' };
export type Technologies = Technology[];

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
