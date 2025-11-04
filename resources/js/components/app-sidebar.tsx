import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SkillConfig, TagConfig, TechConfig } from '@/config/config';
import { breadcrumbTree } from '@/hooks/use-breadcrumbs';
import { type NavItem } from '@/types';
import { DemoConfig } from '@/types/demo';
import { Link, usePage } from '@inertiajs/react';
import { Badge, BadgeCheck, FolderClosed, LayoutGrid, Text, Wrench } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        ...breadcrumbTree.dashboard(),
        icon: LayoutGrid,
    },
    {
        ...breadcrumbTree.project_index(),
        icon: FolderClosed,
    },
    {
        ...breadcrumbTree.tag_index({ tagConfig: TagConfig }),
        icon: Badge,
    },
    {
        ...breadcrumbTree.tag_index({ tagConfig: TechConfig }),
        icon: Wrench,
    },
    {
        ...breadcrumbTree.tag_index({ tagConfig: SkillConfig }),
        icon: BadgeCheck,
    },
    {
        ...breadcrumbTree.edit_text(),
        icon: Text,
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {!demoConfig?.enabled && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
