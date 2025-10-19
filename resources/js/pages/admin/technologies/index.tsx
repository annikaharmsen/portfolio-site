import { TechConfig } from '@/config/config';
import { Tags } from '@/types/models';
import TagIndex from '../tags';

interface TechIndexProps {
    technologies: Tags;
}

export default function TechIndex({ technologies }: TechIndexProps) {
    return <TagIndex tags={technologies} tagConfig={TechConfig} />;
}
