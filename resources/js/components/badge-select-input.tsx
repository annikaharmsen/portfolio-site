import { cn } from '@/lib/utils';
import { ComponentProps, MouseEventHandler, useEffect, useMemo, useReducer } from 'react';
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
    onClickPlus?: MouseEventHandler;
}

export default function BadgeSelectInput({
    value = [],
    onChange,
    options,
    valueResource = 'id',
    textResource = 'title',
    onClickPlus,
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

    const mappedOptions = useMemo(
        () =>
            options.map((option) => ({
                value: Number(option[valueResource]),
                text: String(option[textResource]),
            })),
        [options, valueResource, textResource],
    );

    return (
        <>
            {mappedOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                    <SelectBadge onClick={() => toggleValue(option.value)} key={index} selected={isSelected} role="button">
                        {option.text}
                    </SelectBadge>
                );
            })}
            {onClickPlus && <SelectBadge onClick={onClickPlus}>+</SelectBadge>}
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
