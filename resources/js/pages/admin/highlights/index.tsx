import EditHighlights from '@/components/sections/edit-highlights';
import { Highlight } from '@/types/models';
import { Head } from '@inertiajs/react';

export default function HighlightsIndex({ highlights = [] }: { highlights?: Highlight[] }) {
    return (
        <>
            <Head title="Highlights" />
            <EditHighlights highlights={highlights} />
        </>
    );
}
