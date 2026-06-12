import { cn } from '@/lib/utils';
import { ComponentProps, MouseEventHandler, ReactNode, useEffect, useMemo, useReducer } from 'react';
import { Badge } from './ui/badge';

interface badgeSelectInputProps<
    Option extends Record<string, unknown> = Record<string, unknown>,
    ValueResource extends keyof Option = keyof Option,
    TextResource extends keyof Option = keyof Option,
> {
    value?: number[];
    onChange?: (value: number[]) => void;
    options: Option[];
    valueResource?: ValueResource;
    textResource?: TextResource;
    groupBy?: keyof Option;
    onClickPlus?: MouseEventHandler;
    addAction?: ReactNode;
}

export default function BadgeSelectInput({
    value = [],
    onChange,
    options,
    valueResource = 'id',
    textResource = 'title',
    groupBy,
    onClickPlus,
    addAction,
}: badgeSelectInputProps) {
    const [selectedValues, toggleValue] = useReducer((prevValues: number[], toggledValue: number): number[] => {
        const updatedValues = prevValues.includes(toggledValue)
            ? prevValues.filter((v: number) => v !== toggledValue)
            : [...prevValues, toggledValue];

        return updatedValues;
    }, value);

    useEffect(() => {
        onChange?.(selectedValues);
    }, [onChange, selectedValues]);

    const mappedOptions = useMemo(() => {
        const mapped = options.map((option) => ({
            value: Number(option[valueResource]),
            text: String(option[textResource]),
            group: groupBy ? String(option[groupBy] ?? 'other') : undefined,
        }));

        if (!groupBy) return { ungrouped: mapped };

        const groups: Record<string, typeof mapped> = {};
        for (const opt of mapped) {
            const key = opt.group!;
            (groups[key] ??= []).push(opt);
        }
        return groups;
    }, [options, valueResource, textResource, groupBy]);

    return (
        <>
            {Object.entries(mappedOptions).map(([group, groupOpts]) => (
                <div key={group} className={groupBy ? 'mb-2' : undefined}>
                    {groupBy && (
                        <span className="text-muted-foreground mb-1 block text-xs font-medium uppercase tracking-wide">
                            {group}
                        </span>
                    )}
                    <div className="flex flex-wrap">
                        {groupOpts.map((option) => {
                            const isSelected = selectedValues.includes(option.value);
                            return (
                                <SelectBadge
                                    onClick={() => toggleValue(option.value)}
                                    key={option.value}
                                    selected={isSelected}
                                    role="button"
                                >
                                    {option.text}
                                </SelectBadge>
                            );
                        })}
                    </div>
                </div>
            ))}
            {addAction ? addAction : onClickPlus && <SelectBadge onClick={onClickPlus}>+</SelectBadge>}
        </>
    );
}

export const SelectBadge = ({
    selected = false,
    className,
    children,
    ...props
}: { selected?: boolean } & Omit<ComponentProps<typeof Badge>, 'variant'>) => (
    <Badge variant="secondary" className={cn('m-1 opacity-70 hover:opacity-100', selected && 'opacity-100', className)} role="button" {...props}>
        {children}
    </Badge>
);
