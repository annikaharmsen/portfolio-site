import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CategoryReassignDropdownProps {
    skillGroups: { id: number; name: string }[];
    disabled: boolean;
    onSelect: (skillGroupId: number) => void;
}

export default function CategoryReassignDropdown({ skillGroups, disabled, onSelect }: CategoryReassignDropdownProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (skillGroupId: number) => {
        onSelect(skillGroupId);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1" disabled={disabled}>
                    Assign Group
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>assign group</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {skillGroups.map((group) => (
                    <DropdownMenuItem key={group.id} onSelect={() => handleSelect(group.id)}>
                        {group.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
