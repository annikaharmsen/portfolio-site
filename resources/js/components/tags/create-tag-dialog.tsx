import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TagConfig } from '@/config/config';
import { Projects, SkillGroups } from '@/types/models';
import { ReactNode, useState } from 'react';
import TagForm from './form';

interface CreateTagDialogProps {
    trigger: ReactNode;
    projects?: Projects;
    categories?: string[];
    skillGroups?: SkillGroups;
}

export default function CreateTagDialog({ trigger, projects = [], categories = [...TagConfig.CATEGORIES], skillGroups = [] }: CreateTagDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Tag</DialogTitle>
                </DialogHeader>
                <TagForm
                    tagConfig={TagConfig}
                    projects={projects}
                    categories={categories}
                    skillGroups={skillGroups}
                    inline
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
