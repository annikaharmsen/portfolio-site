import { useState } from 'react';
import { SkillGroups } from '@/types/models';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const NONE_SENTINEL = '__none__';
const NEW_SENTINEL = '__new__';

interface SkillGroupSelectProps {
    id?: string;
    value: number | null;
    onChange: (value: number | null) => void;
    options: SkillGroups;
    creatable?: boolean;
    placeholder?: string;
}

export default function SkillGroupSelect({
    id,
    value,
    onChange,
    options,
    creatable = false,
    placeholder = 'none',
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
        if (selected === NONE_SENTINEL) {
            onChange(null);
            return;
        }
        onChange(Number(selected));
    };

    const handleCreate = () => {
        if (!newName.trim()) return;
        setCreating(true);

        const nextSortOrder =
            options.length > 0 ? Math.max(...options.map((sg) => sg.sort_order)) + 1 : 1;

        router.post(
            '/skill-groups',
            { name: newName.trim(), sort_order: nextSortOrder },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const updatedGroups = (page.props as any).skillGroups as SkillGroups;
                    const created = updatedGroups.reduce(
                        (max, sg) => (sg.id > max.id ? sg : max),
                        updatedGroups[0],
                    );
                    onChange(created.id);
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
            <div className="flex gap-2">
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

    const selectValue = value !== null ? String(value) : NONE_SENTINEL;

    return (
        <Select value={selectValue} onValueChange={handleValueChange}>
            <SelectTrigger id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={NONE_SENTINEL}>{placeholder}</SelectItem>
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
