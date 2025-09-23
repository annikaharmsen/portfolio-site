import { DeleteButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import useController from '@/hooks/use-controller';
import AppLayout from '@/layouts/app-layout';
import { Projects, Skill } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditSkillProps {
    skill: Skill;
    projects: Projects;
}

export default function EditSkill({ skill, projects }: EditSkillProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_skill', skill);

    const controller = useController('skills');
    const handleDelete = () => controller.delete(skill);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Skill" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>Edit Skill</H1>
                    <DeleteButton onClick={handleDelete} />
                </div>
                <TagForm tag={skill} baseURI="skills" projects={projects} />
                <DeleteButton onClick={handleDelete} />
            </div>
        </AppLayout>
    );
}
