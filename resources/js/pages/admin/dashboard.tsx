import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/table-columns';
import TagList from '@/components/tags/tag-list';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectConfig } from '@/config/config';
import { Project, Projects, SkillGroups, Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    projects: Projects;
    tags: Tags;
    skillGroups: SkillGroups;
    projectCategories: string[];
}

export default function Dashboard({ projects, tags, skillGroups, projectCategories }: DashboardProps) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="grid h-full w-full gap-4 rounded-xl min-[1500px]:grid-cols-2">
                <Card className="max-w-full overflow-x-auto">
                    <CardContent>
                        <ModelList<Project> models={projects} modelConfig={ProjectConfig} columns={ProjectTableColumns} searchBy="title" categories={projectCategories} />
                    </CardContent>
                </Card>
                <Card className="max-w-full overflow-x-auto">
                    <CardContent>
                        <TagList tags={tags} skillGroups={skillGroups} accordion />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
