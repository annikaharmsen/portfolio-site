import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { TagConfig } from '@/config/config';
import useController from '@/hooks/use-controller';
import useSelection from '@/hooks/use-selection';
import { cn } from '@/lib/utils';
import { Tag, Tags } from '@/types/models';
import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteButton } from '../app-buttons';
import IconComponent from '../icon-component';

interface TagListProps {
    tags: Tags;
    categories: string[];
    className?: string;
}

export default function TagList({ tags, categories, className }: TagListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const modelSelection = useSelection<number>([]);
    const controller = useController(TagConfig.BASE_URI);

    const filteredTags = useMemo(
        () => tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [tags, searchTerm],
    );

    const grouped = useMemo(() => {
        const groups: { label: string; tags: Tag[] }[] = [];

        for (const cat of categories) {
            const matched = filteredTags.filter((t) => t.category === cat);
            if (matched.length > 0) {
                groups.push({ label: cat.charAt(0).toUpperCase() + cat.slice(1), tags: matched });
            }
        }

        const uncategorized = filteredTags.filter((t) => !t.category);
        if (uncategorized.length > 0) {
            groups.push({ label: 'Uncategorized', tags: uncategorized });
        }

        return groups;
    }, [filteredTags, categories]);

    const handleBulkDelete = () => {
        controller.bulk_delete(modelSelection.selected);
        modelSelection.clear();
    };

    return (
        <div className={cn('relative w-full space-y-4', className)}>
            <div className="flex justify-between gap-2">
                <Input
                    placeholder="Search tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 w-full min-w-min"
                />
                <DeleteButton className="h-9" disabled={modelSelection.selected.length === 0} onClick={handleBulkDelete} showIcon>
                    Delete {modelSelection.selected.length}
                </DeleteButton>
            </div>

            <div className="space-y-2">
                {grouped.map((group) => (
                    <Collapsible key={group.label} defaultOpen>
                        <div className="rounded-md border">
                            <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-muted/50">
                                <span>
                                    {group.label}{' '}
                                    <span className="text-muted-foreground">({group.tags.length})</span>
                                </span>
                                <ChevronDown className="h-4 w-4 transition-transform [[data-state=closed]_&]:rotate-(-90)" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <table className="w-max min-w-full">
                                    <tbody>
                                        {group.tags.map((tag) => {
                                            const isSelected = modelSelection.isSelected(tag.id);
                                            return (
                                                <tr
                                                    key={tag.id}
                                                    className="border-t hover:bg-muted/50"
                                                    onClick={() => controller.edit(tag)}
                                                >
                                                    <td className="w-10 p-2">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onCheckedChange={() => modelSelection.select(tag.id)}
                                                        />
                                                    </td>
                                                    <td className="w-10 p-2">
                                                        <IconComponent icon_name={tag.icon_name} className="mx-auto" />
                                                    </td>
                                                    <td className="p-2">{tag.name}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </CollapsibleContent>
                        </div>
                    </Collapsible>
                ))}
            </div>

            <div
                onClick={() => controller.create()}
                className="flex h-12 cursor-pointer items-center justify-center rounded-md border text-muted-foreground hover:bg-accent/50"
            >
                + Add Tag
            </div>

            <p className="text-sm text-muted-foreground">
                {modelSelection.selected.length} of {filteredTags.length} selected.
            </p>
        </div>
    );
}
