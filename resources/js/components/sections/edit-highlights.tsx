import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, cardStyles } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Highlight } from '@/types/models';
import { router } from '@inertiajs/react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function HighlightCard({ highlight, onDelete }: { highlight?: Highlight; onDelete?: () => void }) {
    const isNew = !highlight?.id;

    const [form, setForm] = useState({
        text: highlight?.text ?? '',
        sort_order: highlight?.sort_order ?? 0,
    });

    const updateField = (field: keyof typeof form, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isNew) {
            router.post('/highlights', form);
        } else {
            router.put(`/highlights/${highlight.id}`, form);
        }
    };

    const handleDelete = () => {
        if (highlight?.id) {
            if (!confirm('Are you sure you want to delete this highlight?')) return;
            router.delete(`/highlights/${highlight.id}`);
        } else {
            onDelete?.();
        }
    };

    const cardTitle = isNew ? 'New Highlight' : (form.text.slice(0, 60) + (form.text.length > 60 ? '…' : '')) || 'Untitled';

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardHeader>
                    <CardTitle className="font-sans text-lg">{cardTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`text-${highlight?.id ?? 'new'}`}>Highlight Text</Label>
                        <TextareaAutosize
                            id={`text-${highlight?.id ?? 'new'}`}
                            value={form.text}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('text', e.target.value)}
                            placeholder="e.g. Reduced deployment time by 40% through CI/CD pipeline improvements"
                            className={cn(textAreaStyles, 'w-full resize-none')}
                            minRows={2}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`sort-${highlight?.id ?? 'new'}`}>Sort Order</Label>
                        <Input
                            id={`sort-${highlight?.id ?? 'new'}`}
                            type="number"
                            value={form.sort_order}
                            onChange={(e) => updateField('sort_order', Number(e.target.value))}
                        />
                    </div>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={handleDelete}>
                        <Trash2 className="mr-1 size-4" />
                        {isNew ? 'Discard' : 'Delete'}
                    </Button>
                    <Button type="submit" size="sm">
                        <Save className="mr-1 size-4" />
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function EditHighlights({ highlights = [] }: { highlights?: Highlight[] }) {
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-6">
            {highlights.map((highlight) => (
                <HighlightCard key={highlight.id} highlight={highlight} />
            ))}
            {showNew && <HighlightCard onDelete={() => setShowNew(false)} />}
            <Button
                onClick={() => setShowNew(true)}
                variant="ghost"
                className={cn(cardStyles, 'w-full hover:bg-muted hover:text-foreground')}
                disabled={showNew}
            >
                <Plus />
            </Button>
        </div>
    );
}
