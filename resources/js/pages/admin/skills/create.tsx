import { SkillConfig } from '@/config/config';
import { Projects } from '@/types/models';
import CreateTag from '../tags/create';

interface CreateSkillProps {
    projects: Projects;
}

export default function CreateSkill({ projects }: CreateSkillProps) {
    return <CreateTag tagConfig={SkillConfig} projects={projects} />;
}
