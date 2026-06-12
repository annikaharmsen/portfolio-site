import CategoryReassignDropdown from '@/components/category-reassign-dropdown';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { TagConfig } from '@/config/config';
import useController from '@/hooks/use-controller';
import useSelection from '@/hooks/use-selection';
import { cn } from '@/lib/utils';
import { SkillGroup, SkillGroups, Tag, Tags } from '@/types/models';
import { Check, ChevronDown, Pencil, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteButton } from '../app-buttons';
import IconComponent from '../icon-component';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface TagListProps {
    tags: Tags;
    skillGroups: SkillGroups;
    accordion?: boolean;
    className?: string;
}

export default function TagList({ tags, skillGroups, accordion = false, className }: TagListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const modelSelection = useSelection<number>([]);
    const controller = useController(TagConfig.BASE_URI);

    const [editingGroup, setEditingGroup] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ name: '', sort_order: 0 });

    const skillGroupOptions = useMemo(
        () => skillGroups.map((sg) => ({ id: sg.id, name: sg.name })),
        [skillGroups],
    );

    const filteredTags = useMemo(
        () => tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [tags, searchTerm],
    );

    const grouped = useMemo(() => {
        const groups: { skillGroup: SkillGroup; tags: Tag[] }[] = [];

        for (const sg of skillGroups) {
            const matched = filteredTags.filter((t) => t.skill_group_id === sg.id);
            if (matched.length > 0) {
                groups.push({ skillGroup: sg, tags: matched });
            }
        }

        const ungrouped = filteredTags.filter((t) => !t.skill_group_id);
        if (ungrouped.length > 0) {
            groups.push({
                skillGroup: { id: 0, name: 'Ungrouped', sort_order: 999 } as SkillGroup,
                tags: ungrouped,
            });
        }

        return groups;
    }, [filteredTags, skillGroups]);

    const startEditing = (sg: SkillGroup) => {
        setEditingGroup(sg.id);
        setEditForm({ name: sg.name, sort_order: sg.sort_order });
    };

    const saveGroup = (id: number) => {
        router.put(`/skill-groups/${id}`, editForm, {
            preserveScroll: true,
            onSuccess: () => setEditingGroup(null),
        });
    };

    const deleteGroup = (id: number) => {
        if (!confirm('Delete this group? Tags will become ungrouped.')) return;
        router.delete(`/skill-groups/${id}`, { preserveScroll: true });
    };

    const handleBulkDelete = () => {
        controller.bulk_delete(modelSelection.selected);
        modelSelection.clear();
    };

    const handleBulkUpdateCategory = (skillGroupId: number) => {
        controller.bulk_update_category(modelSelection.selected, skillGroupId);
        modelSelection.clear();
    };

    const renderTagRows = (groupTags: Tag[]) =>
        groupTags.map((tag) => {
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
        });

    const renderGroupLabel = (group: { skillGroup: SkillGroup; tags: Tag[] }) => (
        <>
            {group.skillGroup.name}{' '}
            <span className="text-muted-foreground">({group.tags.length})</span>
        </>
    );

    const renderGroupHeader = (group: { skillGroup: SkillGroup; tags: Tag[] }) => {
        const sg = group.skillGroup;
        const isEditing = editingGroup === sg.id;
        const isReal = sg.id !== 0;

        if (!isReal) return <span>{renderGroupLabel(group)}</span>;

        if (isEditing) {
            return (
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="h-7 w-40 text-sm"
                        autoFocus
                    />
                    <Input
                        type="number"
                        value={editForm.sort_order}
                        onChange={(e) => setEditForm({ ...editForm, sort_order: Number(e.target.value) })}
                        className="h-7 w-16 text-sm"
                    />
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveGroup(sg.id)}>
                        <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingGroup(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteGroup(sg.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2">
                <span>{renderGroupLabel(group)}</span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 opacity-50 hover:opacity-100"
                    onClick={(e) => { e.stopPropagation(); startEditing(sg); }}
                >
                    <Pencil className="h-3 w-3" />
                </Button>
            </div>
        );
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
                <CategoryReassignDropdown
                    skillGroups={skillGroupOptions}
                    disabled={modelSelection.selected.length === 0}
                    onSelect={handleBulkUpdateCategory}
                />
                <DeleteButton className="h-9" disabled={modelSelection.selected.length === 0} onClick={handleBulkDelete} showIcon>
                    Delete {modelSelection.selected.length}
                </DeleteButton>
            </div>

            {accordion ? (
                <Accordion type="single" collapsible defaultValue={String(grouped[0]?.skillGroup.id)} className="rounded-md border">
                    {grouped.map((group) => (
                        <AccordionItem key={group.skillGroup.id} value={String(group.skillGroup.id)}>
                            <AccordionTrigger>{renderGroupHeader(group)}</AccordionTrigger>
                            <AccordionContent>
                                <table className="w-max min-w-full">
                                    <tbody>{renderTagRows(group.tags)}</tbody>
                                </table>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <div className="space-y-2">
                    {grouped.map((group) => (
                        <Collapsible key={group.skillGroup.id} defaultOpen>
                            <div className="rounded-md border">
                                <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 text-sm font-medium hover:bg-muted/50">
                                    {renderGroupHeader(group)}
                                    <ChevronDown className="h-4 w-4 transition-transform [[data-state=closed]_&]:rotate-(-90)" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <table className="w-max min-w-full">
                                        <tbody>{renderTagRows(group.tags)}</tbody>
                                    </table>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    ))}
                </div>
            )}

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
