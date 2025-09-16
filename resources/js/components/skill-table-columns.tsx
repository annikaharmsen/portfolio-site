import { Skill } from '@/types/models';
import IconComponent from './icon-component';

export const SkillTableColumns = [
    {
        name: 'Icon',
        headingComponent: <th>Icon</th>,
        dataComponent: (skill: Skill) => <td>{IconComponent(skill)}</td>,
    },
    {
        name: 'Name',
        headingComponent: <th className="text-left">Name</th>,
        dataComponent: (skill: Skill) => <td>{skill.name}</td>,
    },
];
