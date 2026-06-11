import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, cardStyles } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SkillGroup } from '@/types/models';
import { router } from '@inertiajs/react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

function SkillGroupCard({ skillGroup, onDelete }: { skillGroup?: SkillGroup; onDelete?: () => void }) {
    const isNew = !skillGroup?.id;

    const [form, setForm] = useState({
        name: skillGroup?.name ?? '',
        sort_order: skillGroup?.sort_order ?? 0,
    });

    const updateField = (field: keyof typeof form, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isNew) {
            router.post('/skill-groups', form);
        } else {
            router.put(`/skill-groups/${skillGroup.id}`, form);
        }
    };

    const handleDelete = () => {
        if (skillGroup?.id) {
            if (!confirm('Delete this skill group? Its tags will need to be reassigned.')) return;
            router.delete(`/skill-groups/${skillGroup.id}`);
        } else {
            onDelete?.();
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardHeader>
                    <CardTitle className="font-sans text-lg">
                        {isNew ? 'New Skill Group' : form.name || 'Untitled'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor={`name-${skillGroup?.id ?? 'new'}`}>Group Name</Label>
                            <Input
                                id={`name-${skillGroup?.id ?? 'new'}`}
                                value={form.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                placeholder="e.g. Languages"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`sort-${skillGroup?.id ?? 'new'}`}>Sort Order</Label>
                            <Input
                                id={`sort-${skillGroup?.id ?? 'new'}`}
                                type="number"
                                value={form.sort_order}
                                onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                    {skillGroup?.tags && skillGroup.tags.length > 0 && (
                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Tags in this group</Label>
                            <div className="flex flex-wrap gap-1.5">
                                {skillGroup.tags.map((tag) => (
                                    <span key={tag.id} className="rounded-md bg-muted px-2 py-0.5 text-xs">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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

export default function EditSkillGroups({ skillGroups = [] }: { skillGroups?: SkillGroup[] }) {
    const [showNew, setShowNew] = useState(false);

    return (
        <div className="space-y-6">
            {skillGroups.map((sg) => (
                <SkillGroupCard key={sg.id} skillGroup={sg} />
            ))}
            {showNew && <SkillGroupCard onDelete={() => setShowNew(false)} />}
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
