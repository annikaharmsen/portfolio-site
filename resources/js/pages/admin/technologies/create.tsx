import { TechConfig } from '@/config/config';
import { Projects } from '@/types/models';
import CreateTag from '../tags/create';

interface CreateTechnologyProps {
    projects: Projects;
}

export default function CreateTechnology({ projects }: CreateTechnologyProps) {
    return <CreateTag tagConfig={TechConfig} projects={projects} />;
}
