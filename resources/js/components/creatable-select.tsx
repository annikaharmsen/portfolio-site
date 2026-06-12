import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input, inputStyles } from '@/components/ui/input';

const NEW_CATEGORY_SENTINEL = '__new__';

interface CreatableSelectProps {
    id: string;
    value: string | null;
    onChange: (value: string | null) => void;
    options: string[];
    placeholder?: string;
}

export default function CreatableSelect({ id, value, onChange, options, placeholder = 'select a category' }: CreatableSelectProps) {
    const isCustom = value !== null && value !== '' && !options.includes(value);
    const [showInput, setShowInput] = useState(isCustom);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        if (selected === NEW_CATEGORY_SENTINEL) {
            setShowInput(true);
            onChange('');
        } else {
            setShowInput(false);
            onChange(selected || null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value || null);
    };

    const handleCancel = () => {
        setShowInput(false);
        onChange(null);
    };

    if (showInput) {
        return (
            <div className="flex gap-2">
                <Input
                    id={id}
                    value={value ?? ''}
                    onChange={handleInputChange}
                    placeholder="type a new category"
                    autoFocus
                />
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
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
            <option value={NEW_CATEGORY_SENTINEL}>+ new category...</option>
        </select>
    );
}
