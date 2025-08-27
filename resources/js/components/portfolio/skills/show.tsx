import { getIcon } from '@/lib/generated-icons';
import { Skill } from '@/types/models';

export function Show({ skill }: { skill: Skill }) {
    const SkillIcon = getIcon(skill.icon_name);

    return (
        <div className="flex items-center gap-2 text-sm">
            <SkillIcon className="h-4 w-4 text-secondary" />
            <span>{skill.name}</span>
        </div>
    );
}
