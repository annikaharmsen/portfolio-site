import { getIcon } from '@/lib/generated-icons';
import { Skill } from '@/types/models';

export const Icon = (skill: Skill) => {
    const IconComponent = getIcon(skill.icon_name);
    return <IconComponent />;
};

export const Name = (skill: Skill) => <p>{skill.name}</p>;

export const SkillDataComponents = (skill: Skill) => ({
    Icon: Icon(skill),
    Name: Name(skill),
});
