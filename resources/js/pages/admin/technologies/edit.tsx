import { DeleteButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Technology } from '@/types/models';
import { Head, router } from '@inertiajs/react';

interface EditTechnologyProps {
    technology: Technology;
    projects: Projects;
}

export default function EditTechnology({ technology, projects }: EditTechnologyProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_technology', technology);

    const handleDelete = () => {
        if (technology && confirm('Are you sure you want to delete this technology?')) {
            router.delete(`/technologies/${technology.id}`);
            router.get('/technologies');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Technology" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <H1>Edit Technology</H1>
                <TagForm tag={technology} baseURI="technologies" projects={projects} />
                <DeleteButton onClick={handleDelete} />
            </div>
        </AppLayout>
    );
}
