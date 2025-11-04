import { TagConfig, TagConfigInterface } from '@/config/config';
import { BreadcrumbItem } from '@/types';
import { Project, Tag } from '@/types/models';
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
        title: tagConfig.TYPE.toPlural().toTitleCase(),
        href: tagConfig.BASE_URI,
        parent: breadcrumbTree.dashboard(),
    }),
    create_tag: ({ tagConfig = TagConfig }: { tagConfig?: TagConfigInterface }) => ({
        title: `Add ${tagConfig.TYPE.toTitleCase()}`,
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
    edit_text: () => ({
        title: 'Edit Site Text',
        href: '/text/edit',
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
    'admin/skills/index': 'tag_index',
    'admin/skills/create': 'create_tag',
    'admin/skills/edit': 'edit_tag',
    'admin/technologies/index': 'tag_index',
    'admin/technologies/create': 'create_tag',
    'admin/technologies/edit': 'edit_tag',
    'admin/images': 'select_image',
    'admin/text': 'edit_text',
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
