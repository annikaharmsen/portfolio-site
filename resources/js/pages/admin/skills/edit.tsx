import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Skill } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditSkillProps {
    skill: Skill;
    projects: Projects;
}

export default function EditSkill({ skill, projects }: EditSkillProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_skill', skill);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Skill" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>Edit Skill</H1>
                </div>
                <TagForm tag={skill} baseURI="skills" projects={projects} />
            </div>
        </AppLayout>
    );
}
