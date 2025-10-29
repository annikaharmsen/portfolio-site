import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { DemoConfig } from '@/types/demo';
import { Link, usePage } from '@inertiajs/react';
import { Badge, BadgeCheck, FolderClosed, LayoutGrid, Wrench } from 'lucide-react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: FolderClosed,
    },
    {
        title: 'All Tags',
        href: '/tags',
        icon: Badge,
    },
    {
        title: 'Technologies',
        href: '/technologies',
        icon: Wrench,
    },
    {
        title: 'Skills',
        href: '/skills',
        icon: BadgeCheck,
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
