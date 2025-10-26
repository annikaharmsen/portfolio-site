import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { TagConfig, TagConfigInterface } from '@/config/config';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { Projects } from '@/types/models';
import { Head } from '@inertiajs/react';

interface CreateTagProps {
    tagConfig?: TagConfigInterface;
    projects: Projects;
}

export default function CreateTag({ tagConfig = TagConfig, projects }: CreateTagProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('create_tag', tagConfig);
    const title = breadcrumbs.at(-1)?.title.toTitleCase();

    return (
        <>
            <Head title={title} />
            <div className="m-12 *:mb-12 md:min-w-160">
                <H1 className="w-full">{title}</H1>
                <TagForm tagConfig={tagConfig} projects={projects} />
            </div>
        </>
    );
}
