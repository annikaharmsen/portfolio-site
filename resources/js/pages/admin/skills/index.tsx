import { SkillConfig } from '@/config/config';
import { Tags } from '@/types/models';
import TagIndex from '../tags';

interface SkillIndexProps {
    skills: Tags;
}

export default function SkillIndex({ skills }: SkillIndexProps) {
    return <TagIndex tags={skills} tagConfig={SkillConfig} />;
}
