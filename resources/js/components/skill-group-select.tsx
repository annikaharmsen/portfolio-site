import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillGroups } from '@/types/models';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const NONE_SENTINEL = '__none__';
const NEW_SENTINEL = '__new__';

interface SkillGroupSelectProps {
    id?: string;
    value?: number | null;
    onValueChange: (value: number | null) => void;
    options: SkillGroups;
    creatable?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export default function SkillGroupSelect({
    id,
    value,
    onValueChange,
    options,
    creatable = false,
    placeholder = 'none',
    disabled,
    className,
}: SkillGroupSelectProps) {
    const [showInput, setShowInput] = useState(false);
    const [newName, setNewName] = useState('');
    const [creating, setCreating] = useState(false);

    const handleValueChange = (selected: string) => {
        if (selected === NEW_SENTINEL) {
            setShowInput(true);
            setNewName('');
            return;
        }
        onValueChange(selected === NONE_SENTINEL ? null : Number(selected));
    };

    const handleCreate = () => {
        if (!newName.trim()) return;
        setCreating(true);

        const nextSortOrder = options.length > 0 ? Math.max(...options.map((sg) => sg.sort_order)) + 1 : 1;

        router.post(
            '/skill-groups',
            { name: newName.trim(), sort_order: nextSortOrder },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const updatedGroups = (page.props as any).skillGroups as SkillGroups;
                    const created = updatedGroups.reduce((max, sg) => (sg.id > max.id ? sg : max), updatedGroups[0]);
                    onValueChange(created.id);
                    setShowInput(false);
                    setNewName('');
                },
                onFinish: () => setCreating(false),
            },
        );
    };

    const handleCancel = () => {
        setShowInput(false);
        setNewName('');
    };

    if (showInput) {
        return (
            <div className={cn('flex gap-2', className)}>
                <Input
                    id={id}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCreate();
                        }
                    }}
                    placeholder="new group name"
                    autoFocus
                    disabled={disabled || creating}
                />
                <button
                    type="button"
                    onClick={handleCreate}
                    disabled={creating || !newName.trim()}
                    className="shrink-0 px-2 text-sm text-primary hover:text-primary/80 disabled:opacity-50"
                >
                    {creating ? 'creating...' : 'add'}
                </button>
                <button type="button" onClick={handleCancel} className="shrink-0 px-2 text-sm text-muted-foreground hover:text-foreground">
                    cancel
                </button>
            </div>
        );
    }

    const selectValue = value === undefined ? '' : value === null ? NONE_SENTINEL : String(value);

    return (
        <Select value={selectValue} onValueChange={handleValueChange}>
            <SelectTrigger id={id} disabled={disabled} className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={NONE_SENTINEL}>none</SelectItem>
                {options.map((sg) => (
                    <SelectItem key={sg.id} value={String(sg.id)}>
                        {sg.name}
                    </SelectItem>
                ))}
                {creatable && (
                    <>
                        <SelectSeparator />
                        <SelectItem value={NEW_SENTINEL}>+ new group...</SelectItem>
                    </>
                )}
            </SelectContent>
        </Select>
    );
}
