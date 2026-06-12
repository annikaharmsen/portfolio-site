import EditExperience from '@/components/sections/edit-experience';
import { Experience } from '@/types/models';
import { Head } from '@inertiajs/react';

export default function ExperienceIndex({ experiences = [] }: { experiences?: Experience[] }) {
    return (
        <>
            <Head title="Experience" />
            <EditExperience experiences={experiences} />
        </>
    );
}
