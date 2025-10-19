import { SkillConfig } from '@/config/config';
import { Projects, Tag } from '@/types/models';
import EditTag from '../tags/edit';

interface EditSkillProps {
    skill: Tag;
    projects: Projects;
}

export default function EditSkill({ skill, projects }: EditSkillProps) {
    return <EditTag tagConfig={SkillConfig} projects={projects} tag={skill} />;
}
