import { H1 } from '@/components/headings';
import TagForm from '@/components/tags/form';
import { TagConfig, TagConfigInterface } from '@/config/config';
import { Projects, Tag } from '@/types/models';
import { Head } from '@inertiajs/react';

interface EditTagProps {
    tagConfig?: TagConfigInterface;
    projects: Projects;
    tag: Tag;
}

export default function EditTag({ tagConfig, projects, tag }: EditTagProps) {
    const title = 'Edit ' + tagConfig?.TYPE;

    return (
        <>
            <Head title={title} />
            <div className="m-12 *:mb-12 md:min-w-160">
                <div className="flex items-center justify-between *:my-0">
                    <H1>{title}</H1>
                </div>
                <TagForm tag={tag} tagConfig={TagConfig} projects={projects} />
            </div>
        </>
    );
}
