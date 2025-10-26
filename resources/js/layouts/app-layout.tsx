import DemoBanner from '@/components/demo-banner';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { DemoConfig } from '@/types/demo';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { component, props: pageProps } = usePage();
    const demoConfig = pageProps.demo_config as DemoConfig;

    // Get breadcrumbs from component name if not explicitly provided
    const { getBreadcrumbsFromComponent } = useBreadcrumbs();
    const autoBreadcrumbs = breadcrumbs || getBreadcrumbsFromComponent(component, pageProps);

    return (
        <AppLayoutTemplate breadcrumbs={autoBreadcrumbs} {...props}>
            <div className="mx-12 my-8">
                {demoConfig?.enabled && demoConfig?.show_banner && <DemoBanner demoConfig={demoConfig} />}
                {children}
            </div>
        </AppLayoutTemplate>
    );
};
