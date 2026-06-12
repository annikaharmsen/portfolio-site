import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SkillGroups } from '@/types/models';
import { ReactNode, useState } from 'react';
import ProjectForm from './form';

interface CreateProjectDialogProps {
    trigger: ReactNode;
    skillGroups?: SkillGroups;
    categories?: string[];
}

export default function CreateProjectDialog({ trigger, skillGroups = [], categories = [] }: CreateProjectDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                </DialogHeader>
                <ProjectForm
                    skillGroups={skillGroups}
                    categories={categories}
                    inline
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
