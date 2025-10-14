import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateTechnologyProps {
    projects: Projects;
}

export default function CreateTechnology({ projects }: CreateTechnologyProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_technology');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Technology" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <H1 className="w-full">Create Technology</H1>
                <TagForm baseURI="technologies" projects={projects} categories={['frontend', 'backend']} />
            </div>
        </AppLayout>
    );
}
