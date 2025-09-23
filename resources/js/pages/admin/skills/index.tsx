import { H1 } from '@/components/headings';
import ModelList from '@/components/model-list';
import { SkillTableColumns } from '@/components/skills/skill-table-columns';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Skill, Skills } from '@/types/models';
import { Head } from '@inertiajs/react';

interface SkillIndexProps {
    skills: Skills;
}

export default function SkillIndex({ skills }: SkillIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('skill_index');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Project" />
            <H1 className="mb-6">Skills</H1>
            <ModelList<Skill> models={skills} resource="skills" searchBy="name" columns={SkillTableColumns} rowClickBehavior="edit" />
        </AppLayout>
    );
}
