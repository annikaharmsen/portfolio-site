import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
import { DeleteButton } from './app-buttons';

interface ModelListProps<T extends { id: number }> {
    models: T[];
    modelData: (model: T) => Record<string, ReactNode>;
    baseURI: string;
    searchBy: keyof T;
    className?: string;
    rowClickBehavior?: 'select' | 'show' | 'edit';
}

export default function ModelList<T extends { id: number }>({
    models,
    modelData,
    baseURI,
    searchBy,
    className,
    rowClickBehavior = 'show',
}: ModelListProps<T>) {
    // SEARCHING
    // state var
    const [searchTerm, setSearchTerm] = useState('');
    // filtered models callback
    const filteredModels = models.filter((model) => {
        const searchable = model[searchBy];
        if (typeof searchable != 'string') return [];
        return searchable.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // SELECTION
    // state var
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    // bools
    const allSelected = filteredModels.length > 0 && selectedIds.length === filteredModels.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < filteredModels.length;
    // selection handlers
    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? filteredModels.map((m: T) => m.id) : []);
    };
    const handleSelect = (model: T, isSelected: boolean) => {
        if (isSelected) {
            setSelectedIds((prev) => [...prev, model.id]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== model.id));
        }
    };

    // CONTROLLER
    const handle = {
        select_all: (checked: boolean) => handleSelectAll(checked),
        select: (model: T, isSelected: boolean) => handleSelect(model, isSelected),
        // CONTROLLER ABSTRACTION
        show: (model: T) => {
            router.get(`/${baseURI}/${model.id}`);
        },
        create: () => {
            router.get(`/${baseURI}/create`);
        },
        edit: (model: T) => {
            router.get(`/${baseURI}/${model.id}/edit`);
        },
        bulk_delete: () => {
            const quantity = selectedIds.length;
            if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} entr${quantity === 1 ? 'y' : 'ies'}?`)) {
                router.delete(`/${baseURI}/bulk-delete`, {
                    data: { ids: selectedIds },
                    onSuccess: () => {
                        setSelectedIds([]);
                    },
                });
            }
        },
    };

    return (
        <div className={cn('min-w-140 space-y-4', className)}>
            {/* search and delete  */}
            <div className="flex justify-between gap-2">
                <Input
                    placeholder="Search models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 w-full min-w-min"
                />
                <DeleteButton className="h-9" disabled={!selectedIds.length} onClick={handle.bulk_delete} showIcon>
                    Delete {selectedIds.length}
                </DeleteButton>
            </div>

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">
                                <Checkbox checked={allSelected ? true : someSelected ? 'indeterminate' : false} onCheckedChange={handle.select_all} />
                            </th>
                            {/* modelData keys used as table headings */}
                            {models.length > 0 &&
                                Object.keys(modelData(models[0])).map((key) => (
                                    <th className="p-2 text-left" key={key}>
                                        {key}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredModels.length > 0 ? (
                            filteredModels.map((model) => {
                                const isSelected = selectedIds.includes(model.id);

                                return (
                                    <tr
                                        key={model.id}
                                        className="border-b hover:bg-muted/50"
                                        onClick={() => handle[rowClickBehavior]?.(model, isSelected)}
                                    >
                                        <td className="p-2">
                                            <Checkbox
                                                checked={isSelected}
                                                onCheckedChange={(isSelected) => handle.select(model, !!isSelected)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        {Object.entries(modelData(model)).map(([key, data]) => (
                                            <td className="mx-auto p-2" key={key}>
                                                {data}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="h-24 border-b text-center text-muted-foreground">
                                <td colSpan={5}>No models found.</td>
                            </tr>
                        )}
                        <tr onClick={() => handle.create()} className="h-12 text-center hover:bg-accent/50">
                            <td colSpan={5}>+ Add Model</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-sm text-muted-foreground">
                {selectedIds.length} of {filteredModels.length} model(s) selected.
            </p>
        </div>
    );
}
