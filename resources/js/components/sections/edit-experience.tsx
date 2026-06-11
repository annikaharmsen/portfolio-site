import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, cardStyles } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Experience } from '@/types/models';
import { router } from '@inertiajs/react';
import { Plus, Save, Trash2, X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type DateRange = { start: string; end: string | null };

function ExperienceCard({ experience, onDelete }: { experience?: Experience; onDelete?: () => void }) {
    const isNew = !experience?.id;

    const [form, setForm] = useState({
        title: experience?.title ?? '',
        company: experience?.company ?? '',
        location: experience?.location ?? '',
        date_ranges: (experience?.date_ranges ?? [{ start: '', end: null }]) as DateRange[],
        bullets: experience?.bullets?.join('\n') ?? '',
        sort_order: experience?.sort_order ?? 0,
    });

    const updateField = (field: keyof typeof form, value: string | number | DateRange[]) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const updateDateRange = (index: number, field: 'start' | 'end', value: string) => {
        const ranges = [...form.date_ranges];
        ranges[index] = { ...ranges[index], [field]: value ? value + '-01' : null };
        updateField('date_ranges', ranges);
    };

    const addDateRange = () => {
        updateField('date_ranges', [...form.date_ranges, { start: '', end: null }]);
    };

    const removeDateRange = (index: number) => {
        const ranges = form.date_ranges.filter((_, i) => i !== index);
        updateField('date_ranges', ranges.length ? ranges : [{ start: '', end: null }]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            bullets: form.bullets
                ? form.bullets.split('\n').filter((line: string) => line.trim())
                : null,
        };
        if (isNew) {
            router.post('/experiences', payload);
        } else {
            router.put(`/experiences/${experience.id}`, payload);
        }
    };

    const handleDelete = () => {
        if (experience?.id) {
            if (!confirm('Are you sure you want to delete this experience?')) return;
            router.delete(`/experiences/${experience.id}`);
        } else {
            onDelete?.();
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardHeader>
                    <CardTitle className="font-sans text-lg">
                        {isNew ? 'New Experience' : `${form.title || 'Untitled'} - ${form.company || 'Company'}`}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`title-${experience?.id ?? 'new'}`}>Title</Label>
                            <Input
                                id={`title-${experience?.id ?? 'new'}`}
                                value={form.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="e.g. Software Engineer"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`company-${experience?.id ?? 'new'}`}>Company</Label>
                            <Input
                                id={`company-${experience?.id ?? 'new'}`}
                                value={form.company}
                                onChange={(e) => updateField('company', e.target.value)}
                                placeholder="e.g. Acme Corp"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`location-${experience?.id ?? 'new'}`}>Location</Label>
                        <Input
                            id={`location-${experience?.id ?? 'new'}`}
                            value={form.location}
                            onChange={(e) => updateField('location', e.target.value)}
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>Date Ranges</Label>
                        {form.date_ranges.map((range, index) => (
                            <div key={index} className="flex items-end gap-2">
                                <div className="flex-1 space-y-1">
                                    <Label className="text-xs text-muted-foreground">Start</Label>
                                    <Input
                                        type="month"
                                        value={range.start?.slice(0, 7) ?? ''}
                                        onChange={(e) => updateDateRange(index, 'start', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Label className="text-xs text-muted-foreground">End</Label>
                                    <Input
                                        type="month"
                                        value={range.end?.slice(0, 7) ?? ''}
                                        onChange={(e) => updateDateRange(index, 'end', e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">empty = present</p>
                                </div>
                                {form.date_ranges.length > 1 && (
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeDateRange(index)}>
                                        <X className="size-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addDateRange}>
                            <Plus className="mr-1 size-3" /> Add date range
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`bullets-${experience?.id ?? 'new'}`}>Bullets — one per line</Label>
                        <TextareaAutosize
                            id={`bullets-${experience?.id ?? 'new'}`}
                            value={form.bullets}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('bullets', e.target.value)}
                            placeholder="each line becomes a bullet point"
                            className={cn(textAreaStyles, 'w-full resize-none')}
                            minRows={3}
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

export default function EditExperience({ experiences = [] }: { experiences?: Experience[] }) {
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-6">
            {experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
            ))}
            {showNew && <ExperienceCard onDelete={() => setShowNew(false)} />}
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
