import ModelList from '@/components/model-list';
import { ProjectTableColumns } from '@/components/projects/table-columns';
import { TagTableColumns } from '@/components/tags/table-columns';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectConfig, SkillConfig, TechConfig } from '@/config/config';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import AppLayout from '@/layouts/app-layout';
import { Project, Projects, Tag, Tags } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface DashboardProps {
    projects: Projects;
    tags: Tags;
}
export default function Dashboard({ projects, tags }: DashboardProps) {
    const cards = [
        <ModelList<Project> models={projects} modelConfig={ProjectConfig} columns={ProjectTableColumns} searchBy="title" />,
        <ModelList<Tag>
            models={tags.filter((tag) => tag.category === 'skill')}
            modelConfig={SkillConfig}
            columns={TagTableColumns(SkillConfig)}
            searchBy="name"
            rowClickBehavior="edit"
        />,
        <ModelList<Tag>
            models={tags.filter((tag) => tag.category !== 'skill')}
            modelConfig={TechConfig}
            columns={TagTableColumns(TechConfig)}
            searchBy="name"
            rowClickBehavior="edit"
        />,
    ];
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('dashboard');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid h-full w-full gap-4 rounded-xl min-[1500px]:grid-cols-2">
                {cards &&
                    cards.map((card: ReactNode) => (
                        <Card className="max-w-full overflow-x-auto">
                            <CardContent>{card}</CardContent>
                        </Card>
                    ))}
            </div>
        </AppLayout>
    );
}
