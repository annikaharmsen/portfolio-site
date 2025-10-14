import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Technology } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditTechnologyProps {
    technology: Technology;
    projects: Projects;
}

export default function EditTechnology({ technology, projects }: EditTechnologyProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_technology', technology);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Technology" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>Edit Technology</H1>
                </div>
                <TagForm tag={technology} baseURI="technologies" projects={projects} categories={['frontend', 'backend']} />
            </div>
        </AppLayout>
    );
}
