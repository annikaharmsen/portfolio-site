import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, cardStyles } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Experience } from '@/types/models';
import { router } from '@inertiajs/react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function ExperienceCard({
    experience,
    onDelete,
}: {
    experience?: Experience;
    onDelete?: () => void;
}) {
    const isNew = !experience?.id;

    const [form, setForm] = useState({
        title: experience?.title ?? '',
        company: experience?.company ?? '',
        location: experience?.location ?? '',
        start_date: experience?.start_date?.slice(0, 10) ?? '',
        end_date: experience?.end_date?.slice(0, 10) ?? '',
        details: experience?.details ?? '',
        sort_order: experience?.sort_order ?? 0,
    });

    const updateField = (field: keyof typeof form, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isNew) {
            router.post('/experiences', form);
        } else {
            router.put(`/experiences/${experience.id}`, form);
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
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>{isNew ? 'New Experience' : form.title || 'Untitled'}</CardTitle>
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`start-${experience?.id ?? 'new'}`}>Start Date</Label>
                            <Input
                                id={`start-${experience?.id ?? 'new'}`}
                                type="month"
                                value={form.start_date?.slice(0, 7)}
                                onChange={(e) => updateField('start_date', e.target.value + '-01')}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`end-${experience?.id ?? 'new'}`}>End Date</Label>
                            <Input
                                id={`end-${experience?.id ?? 'new'}`}
                                type="month"
                                value={form.end_date?.slice(0, 7) ?? ''}
                                onChange={(e) =>
                                    updateField('end_date', e.target.value ? e.target.value + '-01' : '')
                                }
                            />
                            <p className="text-muted-foreground text-xs">leave empty for current position</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`details-${experience?.id ?? 'new'}`}>Details (Markdown)</Label>
                        <TextareaAutosize
                            id={`details-${experience?.id ?? 'new'}`}
                            value={form.details}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('details', e.target.value)}
                            placeholder="describe your responsibilities, achievements, etc."
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
