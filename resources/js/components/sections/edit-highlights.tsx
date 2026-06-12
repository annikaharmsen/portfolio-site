import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function EditHighlights({ highlights = [] }: { highlights?: string[] }) {
    const [value, setValue] = useState(highlights.join('\n'));
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const lines = value
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        router.put(
            '/highlights',
            { highlights: lines },
            {
                onSuccess: () => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                },
            },
        );
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <HeadingSmall
                title="Highlights"
                description="One highlight per line. Order is preserved."
            />
            <TextareaAutosize
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. Reduced deployment time by 40% through CI/CD pipeline improvements"
                className={cn(textAreaStyles, 'w-full resize-none')}
                minRows={4}
            />
            <div className="flex items-center gap-3">
                <Button type="submit">Save</Button>
                <Transition
                    show={saved}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <span className="text-sm text-muted-foreground">Saved</span>
                </Transition>
            </div>
        </form>
    );
}
