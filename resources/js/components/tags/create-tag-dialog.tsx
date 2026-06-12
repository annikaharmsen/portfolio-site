import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TagConfig } from '@/config/config';
import { router } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import { store } from '../store';
import { SaveButton } from '../app-buttons';

interface CreateTagDialogProps {
    trigger: ReactNode;
}

interface FormErrors {
    icon_name?: string;
    name?: string;
    category?: string;
}

export default function CreateTagDialog({ trigger }: CreateTagDialogProps) {
    const categories = TagConfig.CATEGORIES;
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [iconName, setIconName] = useState<IconName | null>(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<string | null>(null);

    const resetForm = () => {
        setIconName(null);
        setName('');
        setCategory(null);
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
            TagConfig.BASE_URI,
            { icon_name: iconName, name, category, projects: [] },
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
                    <DialogTitle>New Tag</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="tag-icon">Icon</Label>
                        <Provider store={store}>
                            <IconSelectorDropdownClient
                                id="tag-icon"
                                value={iconName}
                                onChange={setIconName}
                                className="w-full"
                            />
                        </Provider>
                        <InputError message={errors.icon_name} />
                    </div>

                    <div>
                        <Label htmlFor="tag-name">Name</Label>
                        <Input
                            id="tag-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tag name"
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="tag-category">Category</Label>
                        <Select value={category ?? ''} onValueChange={(val) => setCategory(val || null)}>
                            <SelectTrigger id="tag-category">
                                <SelectValue placeholder="select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category} />
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
