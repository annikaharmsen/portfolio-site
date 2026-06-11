import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CategoryReassignDropdownProps {
    categories: string[];
    disabled: boolean;
    onSelect: (category: string) => void;
}

export default function CategoryReassignDropdown({ categories, disabled, onSelect }: CategoryReassignDropdownProps) {
    const [creatingNew, setCreatingNew] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [open, setOpen] = useState(false);

    const handleSelect = (category: string) => {
        onSelect(category);
        setOpen(false);
        resetNew();
    };

    const handleSubmitNew = () => {
        const trimmed = newCategory.trim();
        if (trimmed) handleSelect(trimmed);
    };

    const resetNew = () => {
        setCreatingNew(false);
        setNewCategory('');
    };

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);
        if (!nextOpen) resetNew();
    };

    return (
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1" disabled={disabled}>
                    Reassign Category
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>assign category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                    <DropdownMenuItem key={category} onSelect={() => handleSelect(category)}>
                        {category}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {creatingNew ? (
                    <div className="flex items-center gap-1 p-1" onClick={(e) => e.stopPropagation()}>
                        <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitNew()}
                            placeholder="new category"
                            className="h-7 text-sm"
                            autoFocus
                        />
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleSubmitNew}>
                            apply
                        </Button>
                    </div>
                ) : (
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setCreatingNew(true); }}>
                        + new category...
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
