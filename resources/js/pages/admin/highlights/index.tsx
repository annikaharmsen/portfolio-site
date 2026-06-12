import EditHighlights from '@/components/sections/edit-highlights';
import { Head } from '@inertiajs/react';

export default function HighlightsIndex({ highlights = [] }: { highlights?: string[] }) {
    return (
        <>
            <Head title="Highlights" />
            <EditHighlights highlights={highlights} />
        </>
    );
}
