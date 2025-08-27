import { type LucideIcon, Code, Database, Globe, Smartphone, Terminal, Wrench } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
    code: Code,
    database: Database,
    globe: Globe,
    smartphone: Smartphone,
    terminal: Terminal,
    wrench: Wrench,
};

export const getIcon = (name: string): LucideIcon => {
    return iconMap[name] || iconMap[Object.keys(iconMap)[0]];
};

export type IconName = keyof typeof iconMap;
