import { DeleteButton } from '@/components/app-buttons';
import { H1 } from '@/components/headings';
import SkillForm from '@/components/skills/skill-form';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Projects, Skill } from '@/types/models';
import { Head, router } from '@inertiajs/react';

interface EditSkillProps {
    skill: Skill;
    projects: Projects;
}

export default function EditSkill({ skill, projects }: EditSkillProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('edit_skill', skill);

    const handleDelete = () => {
        if (skill && confirm('Are you sure you want to delete this skill?')) {
            router.delete(`/skills/${skill.id}`);
            router.get('/skills');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project" />
            <div className="m-12 *:mb-12 md:min-w-160">
                <H1>Edit Project</H1>
                <SkillForm skill={skill} projects={projects} />
                <DeleteButton onClick={handleDelete} />
            </div>
        </AppLayout>
    );
}
