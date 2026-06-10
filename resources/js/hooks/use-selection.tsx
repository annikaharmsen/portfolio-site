import { useState } from 'react';

export default function useSelection<T>(initial: T[]) {
    const [selected, setSelected] = useState<T[]>(initial);

    const isSelected = (target: T) => selected.includes(target);
    const allSelected = (targets: T[]) => targets.length > 0 && targets.every(isSelected);
    const someSelected = (targets: T[]) => selected.length > 0 && selected.length < targets.length;

    const select = (target: T) => {
        if (isSelected(target)) {
            setSelected((prev) => prev.filter((id) => id !== target));
        } else {
            setSelected((prev) => [...prev, target]);
        }
    };
    const selectAll = (targets: T[]) => {
        setSelected(allSelected(targets) ? [] : targets);
    };
    const clear = () => setSelected([]);

    return { selected, allSelected, someSelected, isSelected, select, selectAll, clear };
}
