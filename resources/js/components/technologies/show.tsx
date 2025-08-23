import { Technology } from '@/types/types';
import { Badge } from 'lucide-react';

export function Show({ technology }: { technology: Technology }) {
    return (
        <Badge key={technology.name} className="bg-sage text-white">
            {technology.name}
        </Badge>
    );
}
