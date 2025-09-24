import { HelpCircle, icons, LucideIcon } from 'lucide-react';
import { IconName } from './icon-selector-dropdown';

export default function IconComponent({ icon_name, className }: { icon_name: IconName; className?: string }) {
    const Icon = icons[icon_name] as LucideIcon;

    if (!Icon) {
        console.warn(`Icon "${icon_name}" not found, using fallback`);
        return <HelpCircle className={className} />;
    }

    return <Icon className={className} />;
}
