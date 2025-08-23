import { Show as Skill } from '@/components/skills/show';
import { Skills } from '@/types/types';

export default function Index({ skills }: { skills: Skills }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {skills && skills.map((skill) => (
                <Skill key={skill.name} skill={skill} />
            ))}
        </div>
    );
}