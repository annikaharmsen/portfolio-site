import { Project, Skill, Technology } from '@/types/models';

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
        skill_index: () => ({
            title: 'Skills',
            href: '/skills',
            parent: breadcrumbTree.dashboard(),
        }),
        create_skill: () => ({
            title: 'Add Skill',
            href: '/skill/create',
            parent: breadcrumbTree.skill_index(),
        }),
        // show_skill: (skill: Skill) => ({
        //     title: skill.name,
        //     href: `/skills/${skill.id}`,
        //     parent: breadcrumbTree.skill_index(),
        // }),
        edit_skill: (skill: Skill) => ({
            title: `Edit ${skill.name}`,
            href: `/projects/${skill.id}/edit`,
            parent: breadcrumbTree.skill_index(),
        }),
        technology_index: () => ({
            title: 'Technologies',
            href: '/technologies',
            parent: breadcrumbTree.dashboard(),
        }),
        create_technology: () => ({
            title: 'Add Technology',
            href: '/technology/create',
            parent: breadcrumbTree.technology_index(),
        }),
        // show_technology: (technology: Technology) => ({
        //     title: technology.name,
        //     href: `/technologies/${technology.id}`,
        //     parent: breadcrumbTree.technology_index(),
        // }),
        edit_technology: (technology: Technology) => ({
            title: `Edit ${technology.name}`,
            href: `/projects/${technology.id}/edit`,
            parent: breadcrumbTree.technology_index(),
        }),
    };

    const getAncestors = (breadcrumb: BreadcrumbTreeItem) => {
        const breadcrumbItem = { title: breadcrumb.title, href: breadcrumb.href };

        if (!breadcrumb.parent) return [breadcrumbItem];

        const parentTree: BreadcrumbTreeItem[] = getAncestors(breadcrumb.parent);
        return [...parentTree, breadcrumbItem];
    };

    const getBreadcrumbs = (page: string, data?: Project | Skill | Technology) => {
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
