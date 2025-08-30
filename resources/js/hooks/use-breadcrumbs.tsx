import { Project } from '@/types/models';

interface BreadcrumbTreeItem {
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
        projects_index: () => ({
            title: 'Projects',
            href: '/projects',
            parent: breadcrumbTree.dashboard(),
        }),
        create_project: () => ({
            title: 'Add Project',
            href: '/projects/create',
            parent: breadcrumbTree.projects_index(),
        }),
        show_project: (project: Project) => ({
            title: project.title,
            href: `/projects/${project.id}`,
            parent: breadcrumbTree.projects_index(),
        }),
        edit_project: (project: Project) => ({
            title: `Edit ${project.title}`,
            href: `/projects/${project.id}/edit`,
            parent: breadcrumbTree.show_project(project),
        }),
    };

    const getAncestors = (breadcrumb: BreadcrumbTreeItem) => {
        const breadcrumbItem = { title: breadcrumb.title, href: breadcrumb.href };

        if (!breadcrumb.parent) return [breadcrumbItem];

        const parentTree: BreadcrumbTreeItem[] = getAncestors(breadcrumb.parent);
        return [...parentTree, breadcrumbItem];
    };

    const getBreadcrumbs = (page: string, data?: Project) => {
        const breadcrumbFunction = breadcrumbTree[page as keyof typeof breadcrumbTree];

        if (!breadcrumbFunction) {
            console.warn(`Breadcrumb page '${page}' not found`);
            return [];
        }

        try {
            const breadcrumb = data ? breadcrumbFunction(data) : breadcrumbFunction();
            return getAncestors(breadcrumb);
        } catch (error) {
            console.warn(`Error generating breadcrumb for '${page}':`, error);
            return [];
        }
    };

    return { breadcrumbTree, getAncestors, getBreadcrumbs };
};
