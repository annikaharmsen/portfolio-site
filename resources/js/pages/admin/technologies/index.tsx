import { H1 } from '@/components/headings';
import ModelList from '@/components/model-list';
import { TagTableColumns } from '@/components/tags/table-columns';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Technologies, Technology } from '@/types/models';
import { Head } from '@inertiajs/react';

interface TechnologyIndexProps {
    technologies: Technologies;
}

export default function TechnologyIndex({ technologies }: TechnologyIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('technology_index');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Technology" />
            <H1 className="mb-6">Technologies</H1>
            <ModelList<Technology> models={technologies} resource="technologies" searchBy="name" columns={TagTableColumns} rowClickBehavior="edit" />
        </AppLayout>
    );
}
