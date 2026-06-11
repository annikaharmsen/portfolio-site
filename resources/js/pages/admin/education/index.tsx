import EditEducation from '@/components/sections/edit-education';
import { Education } from '@/types/models';
import { Head } from '@inertiajs/react';

export default function EducationIndex({ educations = [] }: { educations?: Education[] }) {
    return (
        <>
            <Head title="Education" />
            <EditEducation educations={educations} />
        </>
    );
}
