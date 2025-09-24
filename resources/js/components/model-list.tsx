import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import useController from '@/hooks/use-controller';
import useSelection from '@/hooks/use-selection';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { DeleteButton } from './app-buttons';

interface ModelListProps<T extends { id: number }> {
    models: T[];
    columns: { name: string; headingComponent?: ReactNode; dataComponent: (model: T) => ReactNode }[];
    resource: string;
    searchBy: keyof T;
    className?: string;
    rowClickBehavior?: 'select' | 'show' | 'edit';
}

export default function ModelList<T extends { id: number }>({
    models,
    columns,
    resource,
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
    const modelSelection = useSelection<number>([]);
    const filteredModelIDs = filteredModels.map((m: T) => m.id);

    // HANDLERS
    const modelController = useController(resource);
    const handle = {
        select_all: () => modelSelection.selectAll(filteredModelIDs),
        select: (model: T) => modelSelection.select(model.id),
        // CONTROLLER ABSTRACTION
        ...modelController,
        bulk_delete: () => {
            modelController.bulk_delete(modelSelection.selected);
            modelSelection.clear();
        },
    };

    return (
        <div className={cn('min-w-120 space-y-4', className)}>
            {/* search and delete  */}
            <div className="flex justify-between gap-2">
                <Input
                    placeholder={'Search ' + resource + '...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 w-full min-w-min"
                />
                <DeleteButton className="h-9" disabled={modelSelection.selected.length == 0} onClick={handle.bulk_delete} showIcon>
                    Delete {modelSelection.selected.length}
                </DeleteButton>
            </div>

            {/* table */}
            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">
                                <Checkbox
                                    checked={
                                        modelSelection.allSelected(filteredModelIDs)
                                            ? true
                                            : modelSelection.someSelected(filteredModelIDs)
                                              ? 'indeterminate'
                                              : false
                                    }
                                    onCheckedChange={handle.select_all}
                                />
                            </th>
                            {/* table headings */}
                            {models.length > 0 &&
                                columns.map((column) => {
                                    return column.headingComponent ?? <th key={column.name}>{column.name}</th>;
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredModels.length > 0 ? (
                            filteredModels.map((model) => {
                                const isSelected = modelSelection.isSelected(model.id);
                                console.log(model);
                                return (
                                    <tr key={model.id} className="border-b hover:bg-muted/50" onClick={() => handle[rowClickBehavior]?.(model)}>
                                        <td className="p-2">
                                            <Checkbox
                                                checked={isSelected}
                                                onClick={(e) => e.stopPropagation()}
                                                onCheckedChange={() => handle.select(model)}
                                            />
                                        </td>
                                        {columns.map((column) => {
                                            return column.dataComponent(model);
                                        })}
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
                {modelSelection.selected.length} of {filteredModels.length} selected.
            </p>
        </div>
    );
}
