import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { SkillConfig } from '@/config/config';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateSkillProps {
    projects: Projects;
}

export default function CreateSkill({ projects }: CreateSkillProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_skill');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Skill" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <H1 className="w-full">Create Skill</H1>
                <TagForm tagConfig={SkillConfig} projects={projects} />
            </div>
        </AppLayout>
    );
}
