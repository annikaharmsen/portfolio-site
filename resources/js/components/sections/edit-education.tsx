import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, cardStyles } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { textAreaStyles } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Education } from '@/types/models';
import { router } from '@inertiajs/react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function EducationCard({ education, onDelete }: { education?: Education; onDelete?: () => void }) {
    const isNew = !education?.id;

    const [form, setForm] = useState({
        title: education?.title ?? '',
        institution: education?.institution ?? '',
        graduation_date: education?.graduation_date?.slice(0, 7) ?? '',
        gpa: education?.gpa ?? '',
        bullets: education?.bullets?.join('\n') ?? '',
        sort_order: education?.sort_order ?? 0,
    });

    const updateField = (field: keyof typeof form, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            graduation_date: form.graduation_date + '-01',
            gpa: form.gpa || null,
            bullets: form.bullets
                ? form.bullets.split('\n').filter((line: string) => line.trim())
                : null,
        };
        if (isNew) {
            router.post('/educations', payload);
        } else {
            router.put(`/educations/${education.id}`, payload);
        }
    };

    const handleDelete = () => {
        if (education?.id) {
            if (!confirm('Are you sure you want to delete this education entry?')) return;
            router.delete(`/educations/${education.id}`);
        } else {
            onDelete?.();
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardHeader>
                    <CardTitle className="font-sans text-lg">
                        {isNew ? 'New Education' : `${form.title || 'Untitled'} - ${form.institution || 'Institution'}`}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`title-${education?.id ?? 'new'}`}>Degree / Title</Label>
                            <Input
                                id={`title-${education?.id ?? 'new'}`}
                                value={form.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="e.g. Bachelor of Science in Computer Science"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`institution-${education?.id ?? 'new'}`}>Institution</Label>
                            <Input
                                id={`institution-${education?.id ?? 'new'}`}
                                value={form.institution}
                                onChange={(e) => updateField('institution', e.target.value)}
                                placeholder="e.g. MIT"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`grad-${education?.id ?? 'new'}`}>Graduation Date</Label>
                            <Input
                                id={`grad-${education?.id ?? 'new'}`}
                                type="month"
                                value={form.graduation_date}
                                onChange={(e) => updateField('graduation_date', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`gpa-${education?.id ?? 'new'}`}>GPA</Label>
                            <Input
                                id={`gpa-${education?.id ?? 'new'}`}
                                value={form.gpa}
                                onChange={(e) => updateField('gpa', e.target.value)}
                                placeholder="e.g. 3.98"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`bullets-${education?.id ?? 'new'}`}>Honors / Notes — one per line</Label>
                        <TextareaAutosize
                            id={`bullets-${education?.id ?? 'new'}`}
                            value={form.bullets}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField('bullets', e.target.value)}
                            placeholder="each line becomes a bullet point"
                            className={cn(textAreaStyles, 'w-full resize-none')}
                            minRows={2}
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

export default function EditEducation({ educations = [] }: { educations?: Education[] }) {
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-6">
            {educations.map((edu) => (
                <EducationCard key={edu.id} education={edu} />
            ))}
            {showNew && <EducationCard onDelete={() => setShowNew(false)} />}
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
