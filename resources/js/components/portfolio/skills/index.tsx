import { Skills } from '@/types/models';
import { Show as Skill } from './show';

export default function Index({ skills }: { skills: Skills }) {
    return <div className="grid grid-cols-2 gap-4">{skills && skills.map((skill) => <Skill key={skill.name} skill={skill} />)}</div>;
}
