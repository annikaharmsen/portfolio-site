import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input, inputStyles } from '@/components/ui/input';
import { SkillGroups } from '@/types/models';
import { router } from '@inertiajs/react';

const NEW_GROUP_SENTINEL = '__new__';

interface CreatableSkillGroupSelectProps {
    id: string;
    value: number | null;
    onChange: (value: number | null) => void;
    options: SkillGroups;
}

export default function CreatableSkillGroupSelect({ id, value, onChange, options }: CreatableSkillGroupSelectProps) {
    const [showInput, setShowInput] = useState(false);
    const [newName, setNewName] = useState('');
    const [creating, setCreating] = useState(false);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        if (selected === NEW_GROUP_SENTINEL) {
            setShowInput(true);
            setNewName('');
        } else {
            onChange(selected ? Number(selected) : null);
        }
    };

    const handleCreate = () => {
        if (!newName.trim()) return;
        setCreating(true);

        const nextSortOrder = options.length > 0
            ? Math.max(...options.map((sg) => sg.sort_order)) + 1
            : 1;

        router.post('/skill-groups', { name: newName.trim(), sort_order: nextSortOrder }, {
            preserveScroll: true,
            onSuccess: (page) => {
                const updatedGroups = (page.props as any).skillGroups as SkillGroups;
                const created = updatedGroups.reduce((max, sg) => sg.id > max.id ? sg : max, updatedGroups[0]);
                onChange(created.id);
                setShowInput(false);
                setNewName('');
            },
            onFinish: () => setCreating(false),
        });
    };

    const handleCancel = () => {
        setShowInput(false);
        setNewName('');
    };

    if (showInput) {
        return (
            <div className="flex gap-2">
                <Input
                    id={id}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleCreate(); } }}
                    placeholder="new group name"
                    autoFocus
                    disabled={creating}
                />
                <button
                    type="button"
                    onClick={handleCreate}
                    disabled={creating || !newName.trim()}
                    className="text-sm text-primary hover:text-primary/80 shrink-0 px-2 disabled:opacity-50"
                >
                    {creating ? 'creating...' : 'add'}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-muted-foreground hover:text-foreground shrink-0 px-2 text-sm"
                >
                    cancel
                </button>
            </div>
        );
    }

    return (
        <select
            id={id}
            value={value ?? ''}
            onChange={handleSelectChange}
            className={cn(...inputStyles, 'appearance-auto')}
        >
            <option value="">none</option>
            {options.map((sg) => (
                <option key={sg.id} value={sg.id}>
                    {sg.name}
                </option>
            ))}
            <option value={NEW_GROUP_SENTINEL}>+ new group...</option>
        </select>
    );
}
