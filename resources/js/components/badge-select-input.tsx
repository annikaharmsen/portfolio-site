import { cn } from '@/lib/utils';
import { useEffect, useMemo, useReducer } from 'react';
import { Badge } from './ui/badge';

interface badgeSelectInputProps<
    Option extends Record<string, unknown> = Record<string, unknown>,
    ValueResource extends keyof Option = keyof Option,
    TextResource extends keyof Option = keyof Option,
> {
    id?: string;
    value?: number[];
    onChange?: (value: number[]) => void;
    options: Option[];
    valueResource?: ValueResource;
    textResource?: TextResource;
}

export default function BadgeSelectInput({ id, value = [], onChange, options, valueResource = 'id', textResource = 'title' }: badgeSelectInputProps) {
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
        <div id={id}>
            {mappedOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                    <Badge
                        onClick={() => toggleValue(option.value)}
                        key={index}
                        variant="secondary"
                        className={cn('m-1', !isSelected && 'opacity-70')}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleValue(option.value);
                            }
                        }}
                    >
                        {option.text}
                    </Badge>
                );
            })}
        </div>
    );
}
