import EditSkillGroups from '@/components/sections/edit-skill-groups';
import { SkillGroup } from '@/types/models';
import { Head } from '@inertiajs/react';

export default function SkillGroupIndex({ skillGroups = [] }: { skillGroups?: SkillGroup[] }) {
    return (
        <>
            <Head title="Skill Groups" />
            <EditSkillGroups skillGroups={skillGroups} />
        </>
    );
}
