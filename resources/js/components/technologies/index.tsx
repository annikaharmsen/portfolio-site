import { Show as Technology } from '@/components/technologies/show';
import { Technologies } from '@/types/types';

export default function TechnologiesIndex({ technologies }: { technologies: Technologies }) {
    return <div className="flex flex-wrap gap-2">{technologies && technologies.map((technology) => <Technology technology={technology} />)}</div>;
}
