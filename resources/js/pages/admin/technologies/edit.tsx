import { TechConfig } from '@/config/config';
import { Projects, Tag } from '@/types/models';
import EditTag from '../tags/edit';

interface EditTechnologyProps {
    technology: Tag;
    projects: Projects;
}

export default function EditTechnology({ technology, projects }: EditTechnologyProps) {
    return <EditTag tagConfig={TechConfig} projects={projects} tag={technology} />;
}
