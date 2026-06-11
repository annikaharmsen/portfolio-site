import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { TagConfig } from '@/config/config';
import { breadcrumbTree } from '@/hooks/use-breadcrumbs';
import { NavGroup, type NavItem } from '@/types';
import { DemoConfig } from '@/types/demo';
import { Link, usePage } from '@inertiajs/react';
import { Badge, Briefcase, FolderClosed, GraduationCap, Info, Layers, LayoutGrid, MessageCircle, Text } from 'lucide-react';
import { NavSection } from './nav-main';

const mainNav: NavGroup[] = [
    {
        title: 'Home',
        items: [
            {
                ...breadcrumbTree.dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Project Management',
        items: [
            {
                ...breadcrumbTree.project_index(),
                icon: FolderClosed,
            },
            {
                ...breadcrumbTree.tag_index({ tagConfig: TagConfig }),
                icon: Badge,
            },
            {
                ...breadcrumbTree.skill_group_index(),
                icon: Layers,
            },
        ],
    },
    {
        title: 'Website Text',
        items: [
            {
                ...breadcrumbTree.edit_section({ section: 'intro' }),
                icon: Text,
            },
            {
                ...breadcrumbTree.edit_section({ section: 'about' }),
                icon: Info,
            },
            {
                ...breadcrumbTree.edit_section({ section: 'contact' }),
                icon: MessageCircle,
            },
            {
                ...breadcrumbTree.experience_index(),
                icon: Briefcase,
            },
            {
                ...breadcrumbTree.education_index(),
                icon: GraduationCap,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const demoConfig = usePage().props.demo_config as DemoConfig;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {mainNav.map((group) => (
                    <NavSection title={group.title} items={group.items} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {!demoConfig?.enabled && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
