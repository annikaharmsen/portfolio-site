import InputError from '@/components/input-error';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProjectConfig } from '@/config/config';
import { router } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import { store } from '../store';
import { SaveButton } from '../app-buttons';

interface CreateProjectDialogProps {
    trigger: ReactNode;
}

interface FormErrors {
    icon_name?: string;
    title?: string;
}

export default function CreateProjectDialog({ trigger }: CreateProjectDialogProps) {
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [iconName, setIconName] = useState<IconName | null>(null);
    const [title, setTitle] = useState('');

    const resetForm = () => {
        setIconName(null);
        setTitle('');
        setErrors({});
        setProcessing(false);
    };

    const handleOpenChange = (next: boolean) => {
        setOpen(next);
        if (!next) resetForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post(
            ProjectConfig.BASE_URI,
            { icon_name: iconName, title, inline: true },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    resetForm();
                },
                onError: (errs) => {
                    setErrors(errs as FormErrors);
                    setProcessing(false);
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="project-icon">Icon</Label>
                        <Provider store={store}>
                            <IconSelectorDropdownClient
                                id="project-icon"
                                value={iconName}
                                onChange={setIconName}
                                className="w-full"
                            />
                        </Provider>
                        <InputError message={errors.icon_name} />
                    </div>

                    <div>
                        <Label htmlFor="project-title">Title</Label>
                        <Input
                            id="project-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Project title"
                            autoFocus
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="flex justify-end">
                        <SaveButton disabled={processing}>
                            {processing ? 'Creating...' : 'Create'}
                        </SaveButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
