'use client';

import { setIconList, setIsOpen, setSearchTerm } from '@/components/store';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, icons, X } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, RowComponentProps } from 'react-window';
import { ClassNameValue } from 'tailwind-merge';

export type IconName = keyof typeof icons;

const ITEM_HEIGHT = 36;
// const LIST_HEIGHT = 300;

interface IconSelectorProps {
    id?: string;
    value?: IconName | null;
    onChange?: (selectedIcon: IconName | null) => void;
    className: ClassNameValue;
}

const IconSelectorDropdownClient: React.FC<IconSelectorProps> = ({ id, value = null, onChange, className }: IconSelectorProps) => {
    const dispatch = useDispatch();
    const { searchTerm, iconList, isOpen } = useSelector(
        (state: {
            iconSelector: {
                searchTerm: string;
                iconList: IconName[];
                isOpen: boolean;
            };
        }) => state.iconSelector,
    );
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setIconList(Object.keys(icons) as IconName[]));
    }, [dispatch]);

    const filteredIcons = useMemo(() => {
        if (!searchTerm) return iconList;
        const lowerSearchTerm = searchTerm.toLowerCase();
        return iconList.filter((iconName: string) => iconName.toLowerCase().includes(lowerSearchTerm));
    }, [iconList, searchTerm]);

    const handleOpenChange = useCallback(
        (open: boolean) => {
            dispatch(setIsOpen(open));
            if (open) {
                setTimeout(() => searchInputRef.current?.focus(), 0);
            } else {
                dispatch(setSearchTerm(''));
            }
        },
        [dispatch],
    );

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearchTerm(e.target.value));
        },
        [dispatch],
    );

    const IconItem = useCallback(
        ({ index, style }: RowComponentProps) => {
            const iconName = filteredIcons[index];
            const IconComponent = icons[iconName as IconName];
            return (
                <div
                    style={style}
                    className="flex cursor-pointer items-center p-2 hover:bg-gray-100"
                    onClick={() => {
                        onChange?.(iconName);
                        dispatch(setIsOpen(false));
                    }}
                >
                    <IconComponent className="mr-2 h-4 w-4" />
                    <span className="flex-grow">{iconName}</span>
                    {value === iconName && <IconComponent className="ml-auto h-4 w-4 text-primary" />}
                </div>
            );
        },
        [filteredIcons, value, onChange, dispatch],
    );

    return (
        <div id={id} className={cn('relative min-w-[300px]', className)}>
            <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
                <DropdownMenu.Trigger asChild>
                    <button className="flex h-9 w-full min-w-0 items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
                        <span className="flex-grow text-left text-foreground">{value ? value : 'Select an icon'}</span>
                        {value &&
                            React.createElement(icons[value as IconName], {
                                className: 'mx-2 h-4 w-4',
                            })}
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="w-[300px] overflow-hidden rounded-md border border-border bg-popover shadow-lg" align="start">
                        <div className="p-2">
                            <Input
                                ref={searchInputRef}
                                placeholder="Search icons..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="h-8"
                            />
                        </div>
                        <div className="scroll max-h-[400px] overflow-auto border-t">
                            <List rowCount={filteredIcons.length} rowComponent={IconItem} rowHeight={ITEM_HEIGHT} rowProps={{}} />
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
            {value && (
                <button
                    onClick={() => {
                        onChange?.(null);
                    }}
                    className="absolute top-0 right-0 p-2"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default IconSelectorDropdownClient;
