import { useState } from 'react';

export default function useSelection<T>(initial: T[]) {
    const [selected, setSelected] = useState<T[]>(initial);

    // bools
    const allSelected = (targets: T[]) => targets.length > 0 && targets.filter((t) => !isSelected(t)).length === 0;
    const someSelected = (targets: T[]) => selected.length > 0 && selected.length < targets.length;
    const isSelected = (target: T) => selected.includes(target);

    // selection handlers
    const select = (target: T) => {
        if (isSelected(target)) {
            setSelected((prev) => [...prev, target]);
        } else {
            setSelected((prev) => prev.filter((id) => id !== target));
        }
    };
    const selectAll = (targets: T[]) => {
        setSelected(allSelected(targets) ? [] : targets);
    };
    const clear = () => setSelected([]);

    return {
        selected: selected,
        allSelected: (targets: T[]) => allSelected(targets),
        someSelected: (targets: T[]) => someSelected(targets),
        isSelected: (target: T) => isSelected(target),
        select: (target: T) => select(target),
        selectAll: (targets: T[]) => selectAll(targets),
        clear: clear,
    };
}
