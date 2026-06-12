import { TagConfig, TagConfigInterface } from '@/config/config';
import { pluralize, titleCase } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Project, Tag } from '@/types/models';
import { TextSection } from '@/types/site-texts';
import { usePage } from '@inertiajs/react';

export interface BreadcrumbTreeItem extends BreadcrumbItem {
    title: string;
    href: string;
    parent?: BreadcrumbTreeItem;
}

export const breadcrumbTree = {
    dashboard: () => ({
        title: 'Dashboard',
        href: '/',
    }),
    project_index: () => ({
        title: 'Projects',
        href: '/projects',
        parent: breadcrumbTree.dashboard(),
    }),
    create_project: () => ({
        title: 'Add Project',
        href: '/projects/create',
        parent: breadcrumbTree.project_index(),
    }),
    show_project: ({ project }: { project: Project }) => ({
        title: project.title,
        href: `/projects/${project.id}`,
        parent: breadcrumbTree.project_index(),
    }),
    edit_project: ({ project }: { project: Project }) => ({
        title: `Edit ${project.title}`,
        href: `/projects/${project.id}/edit`,
        parent: breadcrumbTree.show_project({ project }),
    }),
    edit_project_page: ({ project }: { project: Project }) => ({
        title: `Edit ${project.title} Page`,
        href: `/projects/hero_sections/${project.id}/edit`,
        parent: breadcrumbTree.show_project({ project }),
    }),
    tag_index: ({ tagConfig = TagConfig }: { tagConfig?: TagConfigInterface }) => ({
        title: titleCase(pluralize(tagConfig.TYPE)),
        href: tagConfig.BASE_URI,
        parent: breadcrumbTree.dashboard(),
    }),
    create_tag: ({ tagConfig = TagConfig }: { tagConfig?: TagConfigInterface }) => ({
        title: `Add ${titleCase(tagConfig.TYPE)}`,
        href: `${tagConfig.BASE_URI}/create`,
        parent: breadcrumbTree.tag_index({ tagConfig }),
    }),
    edit_tag: ({ tag, tagConfig = TagConfig }: { tag: Tag; tagConfig?: TagConfigInterface }) => ({
        title: `Edit "${tag.name}"`,
        href: `${tagConfig.BASE_URI}/edit`,
        parent: breadcrumbTree.tag_index({ tagConfig }),
    }),
    select_image: ({ project }: { project: Project }) => ({
        title: 'Select Image',
        href: '/images',
        parent: breadcrumbTree.edit_project({ project }),
    }),
    edit_section: ({ section }: { section: TextSection }) => ({
        title: `Edit ${titleCase(section)} Section`,
        href: `/sections/${section}/edit`,
        parent: breadcrumbTree.dashboard(),
    }),
    experience_index: () => ({
        title: 'Edit Experience Section',
        href: '/experiences',
        parent: breadcrumbTree.dashboard(),
    }),
    education_index: () => ({
        title: 'Edit Education Section',
        href: '/educations',
        parent: breadcrumbTree.dashboard(),
    }),
    highlight_index: () => ({
        title: 'Edit Highlights',
        href: '/highlights',
        parent: breadcrumbTree.dashboard(),
    }),
    settings_profile: () => ({
        title: 'Profile',
        href: '/settings/profile',
        parent: breadcrumbTree.dashboard(),
    }),
    settings_password: () => ({
        title: 'Password',
        href: '/settings/password',
        parent: breadcrumbTree.dashboard(),
    }),
    settings_appearance: () => ({
        title: 'Appearance',
        href: '/settings/appearance',
        parent: breadcrumbTree.dashboard(),
    }),
};

const breadcrumbMap: Record<string, keyof typeof breadcrumbTree> = {
    'admin/dashboard': 'dashboard',
    'admin/projects/index': 'project_index',
    'admin/projects/create': 'create_project',
    'admin/projects/edit': 'edit_project',
    'admin/projects/show': 'show_project',
    'admin/projects/hero-sections/edit': 'edit_project',
    'admin/tags/index': 'tag_index',
    'admin/tags/create': 'create_tag',
    'admin/tags/edit': 'edit_tag',
'admin/images': 'select_image',
    'admin/sections/edit': 'edit_section',
    'admin/experience/index': 'experience_index',
    'admin/education/index': 'education_index',
    'admin/highlights/index': 'highlight_index',
    'admin/settings/profile': 'settings_profile',
    'admin/settings/password': 'settings_password',
    'admin/settings/appearance': 'settings_appearance',
};

type BreadcrumbProps<C extends keyof typeof breadcrumbMap> = Parameters<(typeof breadcrumbTree)[(typeof breadcrumbMap)[C]]>[0];

type BreadcrumbFunction<C extends keyof typeof breadcrumbMap> = (args: BreadcrumbProps<C>) => BreadcrumbTreeItem;

export const useBreadcrumbs = (): {
    breadcrumbs: BreadcrumbTreeItem[];
    getBreadcrumbs: <C extends keyof typeof breadcrumbMap>(component: C, args: BreadcrumbProps<C>) => BreadcrumbTreeItem[];
} => {
    const { component, props } = usePage();

    const getAncestors = (breadcrumb: BreadcrumbTreeItem) => {
        const breadcrumbItem = { title: breadcrumb.title, href: breadcrumb.href };

        if (!breadcrumb.parent) return [breadcrumbItem];

        const parentTree: BreadcrumbTreeItem[] = getAncestors(breadcrumb.parent);
        return [...parentTree, breadcrumbItem];
    };

    function getBreadcrumbs<C extends keyof typeof breadcrumbMap>(component: C, args: BreadcrumbProps<C>): BreadcrumbTreeItem[] {
        const breadcrumbFunction = breadcrumbTree[breadcrumbMap[component]] as BreadcrumbFunction<C>;

        if (!breadcrumbFunction) {
            console.warn(`Breadcrumbs not found for this page`);
            return [];
        }

        try {
            const breadcrumb: BreadcrumbTreeItem = breadcrumbFunction(args ?? ({} as BreadcrumbProps<C>));
            return getAncestors(breadcrumb);
        } catch (error) {
            console.warn(`Error generating breadcrumbs for this page:`, error);
            return [];
        }
    }

    const breadcrumbs = getBreadcrumbs(component as keyof typeof breadcrumbMap, props as BreadcrumbProps<keyof typeof breadcrumbMap>);

    return {
        breadcrumbs,
        getBreadcrumbs,
    };
};
