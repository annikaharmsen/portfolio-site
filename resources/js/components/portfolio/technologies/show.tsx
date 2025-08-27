import { Badge } from '@/components/ui/badge';
import { Technology } from '@/types/models';

export function Show({ technology }: { technology: Technology }) {
    return <Badge key={technology.id}>{technology.name}</Badge>;
}
