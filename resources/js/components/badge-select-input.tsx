import { cn } from '@/lib/utils';
import { ComponentProps, ReactNode, useMemo } from 'react';
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
    addAction?: ReactNode;
}

export default function BadgeSelectInput({
    value = [],
    onChange,
    options,
    valueResource = 'id',
    textResource = 'title',
    addAction,
}: badgeSelectInputProps) {
    const mappedOptions = useMemo(() =>
        options.map((option) => ({
            value: Number(option[valueResource]),
            text: String(option[textResource]),
        })),
    [options, valueResource, textResource]);

    function toggle(toggledValue: number) {
        const updated = value.includes(toggledValue)
            ? value.filter((v) => v !== toggledValue)
            : [...value, toggledValue];
        onChange?.(updated);
    }

    return (
        <div className="flex flex-wrap">
            {mappedOptions.map((option) => (
                <SelectBadge
                    onClick={() => toggle(option.value)}
                    key={option.value}
                    selected={value.includes(option.value)}
                    role="button"
                >
                    {option.text}
                </SelectBadge>
            ))}
            {addAction}
        </div>
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
