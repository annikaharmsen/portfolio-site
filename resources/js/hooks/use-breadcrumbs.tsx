import { TagConfig, TagConfigInterface } from '@/config/config';
import { Project, Tag } from '@/types/models';

export interface BreadcrumbTreeItem {
    title: string;
    href: string;
    parent?: BreadcrumbTreeItem;
}

export const useBreadcrumbs = () => {
    const breadcrumbTree = {
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
        show_project: (project: Project) => ({
            title: project.title,
            href: `/projects/${project.id}`,
            parent: breadcrumbTree.project_index(),
        }),
        edit_project: (project: Project) => ({
            title: `Edit ${project.title}`,
            href: `/projects/${project.id}/edit`,
            parent: breadcrumbTree.show_project(project),
        }),
        tag_index: (tagConfig: TagConfigInterface = TagConfig) => ({
            title: tagConfig.TYPE.toPlural().toTitleCase(),
            href: tagConfig.BASE_URI,
            parent: breadcrumbTree.dashboard(),
        }),
        create_tag: (tagConfig: TagConfigInterface = TagConfig) => ({
            title: `Add ${tagConfig.TYPE.toTitleCase()}`,
            href: `${tagConfig.BASE_URI}/create`,
            parent: breadcrumbTree.tag_index(tagConfig),
        }),
        edit_tag: (tag: Tag, tagConfig: TagConfigInterface = TagConfig) => ({
            title: `Edit "${tag.name}"`,
            href: `${tagConfig.BASE_URI}/edit`,
            parent: breadcrumbTree.tag_index(tagConfig),
        }),
    };

    const getAncestors = (breadcrumb: BreadcrumbTreeItem) => {
        const breadcrumbItem = { title: breadcrumb.title, href: breadcrumb.href };

        if (!breadcrumb.parent) return [breadcrumbItem];

        const parentTree: BreadcrumbTreeItem[] = getAncestors(breadcrumb.parent);
        return [...parentTree, breadcrumbItem];
    };

    function getBreadcrumbs<K extends keyof typeof breadcrumbTree>(page: K, ...args: Parameters<(typeof breadcrumbTree)[K]>): BreadcrumbTreeItem[] {
        const breadcrumbFunction = breadcrumbTree[page] as (...args: Parameters<(typeof breadcrumbTree)[K]>) => BreadcrumbTreeItem;

        if (!breadcrumbFunction) {
            console.warn(`Breadcrumb page '${page}' not found`);
            return [];
        }

        try {
            const breadcrumb: BreadcrumbTreeItem = breadcrumbFunction(...args);

            return getAncestors(breadcrumb);
        } catch (error) {
            console.warn(`Error generating breadcrumb for '${page}':`, error);
            return [];
        }
    }

    // Map Inertia component names to breadcrumb keys
    const componentToBreadcrumbMap: Record<string, keyof typeof breadcrumbTree> = {
        'admin/dashboard': 'dashboard',
        'admin/projects/index': 'project_index',
        'admin/projects/create': 'create_project',
        'admin/projects/edit': 'edit_project',
        'admin/projects/show': 'show_project',
        'admin/projects/hero-sections/edit': 'edit_project', // Could add specific hero section breadcrumb
        'admin/tags/index': 'tag_index',
        'admin/tags/create': 'create_tag',
        'admin/tags/edit': 'edit_tag',
        'admin/skills/index': 'tag_index',
        'admin/skills/create': 'create_tag',
        'admin/skills/edit': 'edit_tag',
        'admin/technologies/index': 'tag_index',
        'admin/technologies/create': 'create_tag',
        'admin/technologies/edit': 'edit_tag',
    };

    function getBreadcrumbsFromComponent(componentName: string, props?: any): BreadcrumbTreeItem[] {
        const breadcrumbKey = componentToBreadcrumbMap[componentName];

        if (!breadcrumbKey) {
            return [];
        }

        // Extract args from props if needed
        const args: any[] = [];
        if (props?.project) args.push(props.project);
        if (props?.tag) args.push(props.tag);
        if (props?.tagConfig) args.push(props.tagConfig);

        return getBreadcrumbs(breadcrumbKey, ...args);
    }

    return { breadcrumbTree, getAncestors, getBreadcrumbs, getBreadcrumbsFromComponent, componentToBreadcrumbMap };
};
