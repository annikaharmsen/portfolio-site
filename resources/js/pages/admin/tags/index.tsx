import { H1 } from '@/components/headings';
import TagList from '@/components/tags/tag-list';
import { SkillGroups, Tags } from '@/types/models';
import { Head } from '@inertiajs/react';

interface TagIndexProps {
    tags: Tags;
    skillGroups: SkillGroups;
}

export default function TagIndex({ tags, skillGroups }: TagIndexProps) {
    return (
        <>
            <Head title="Tags" />
            <H1 className="mb-6">Tags</H1>
            <TagList tags={tags} skillGroups={skillGroups} />
        </>
    );
}
