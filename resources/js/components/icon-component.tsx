import { getIcon } from '@/lib/generated-icons';

export default function IconComponent({ icon_name }: { icon_name: string }) {
    const IconComponent = getIcon(icon_name);
    return <IconComponent className="m-auto h-5 w-5" />;
}
