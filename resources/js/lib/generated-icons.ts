import { type LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {};

export const getIcon = (name: string): LucideIcon => {
    return iconMap[name] || iconMap[Object.keys(iconMap)[0]];
};

export type IconName = keyof typeof iconMap;
