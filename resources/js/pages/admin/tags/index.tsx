import { H1 } from '@/components/headings';
import ModelList from '@/components/model-list';
import { TagTableColumns } from '@/components/tags/table-columns';
import { TagConfig, TagConfigInterface } from '@/config/config';
import { useBreadcrumbs } from '@/hooks/use-breadcrumbs';
import { Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface TagIndexProps {
    tags: Tags;
    tagConfig: TagConfigInterface;
}

export default function TagIndex({ tags, tagConfig = TagConfig }: TagIndexProps) {
    const breadcrumbs = useBreadcrumbs().getBreadcrumbs('tag_index', tagConfig);
    const title = breadcrumbs.at(-1)?.title.toTitleCase();

    return (
        <>
            <Head title={title} />
            <H1 className="mb-6">{title}</H1>
            <ModelList models={tags} modelConfig={tagConfig} searchBy="name" columns={TagTableColumns(tagConfig)} rowClickBehavior="edit" />
        </>
    );
}
