import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteButtonProps {
    onClick: () => void;
    quantity?: number;
}

export default function DeleteButton({ onClick, quantity }: DeleteButtonProps) {
    return (
        <Button variant="destructive" size="sm" onClick={onClick} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete {quantity && quantity}
        </Button>
    );
}
