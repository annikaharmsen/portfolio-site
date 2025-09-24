import { LucideIcon } from 'lucide-react';

export default function IconComponent({ icon: Icon }: { icon: LucideIcon }) {
    return <Icon className="m-auto h-5 w-5" />;
}
