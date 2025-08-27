import { Technologies } from '@/types/types';
import { Show as Technology } from './show';

export default function TechnologiesIndex({ technologies }: { technologies: Technologies }) {
    return <div className="flex flex-wrap gap-2">{technologies && technologies.map((technology) => <Technology technology={technology} />)}</div>;
}
