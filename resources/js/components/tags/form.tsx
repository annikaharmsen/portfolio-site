import { TagConfigInterface } from '@/config/config';
import useController from '@/hooks/use-controller';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, Tag } from '@/types/models';
import { router, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, DeleteButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import InputError from '../input-error';
import { store } from '../store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TagFormProps {
    tagConfig: TagConfigInterface;
    projects: Projects;
    tag?: Tag;
    className?: string;
}

export default function TagForm({ tagConfig: { CATEGORIES: categories, BASE_URI: baseURI }, projects, tag, className }: TagFormProps) {
    const isEditing = !!tag;

    const { data, setData, processing, errors, post, put, isDirty } = useForm({
        icon_name: (isEditing && tag.icon_name) || null,
        name: (isEditing && tag.name) || '',
        projects: (isEditing && tag.projects?.map((project) => project.id)) || [],
        category: (isEditing && tag.category) || categories.length === 1 ? categories[0] : undefined,
    });

    const [deleting, setDeleting] = useState(false);

    const controller = useController(baseURI);

    useUnsavedWarning(isDirty && !processing && !deleting);

    // Reload options when returning via history (preserves form state)
    useEffect(() => {
        const handlePopState = () => {
            router.reload({ only: ['projects'] });
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(`${baseURI}/${tag.id}`, {
                onSuccess: () => history.back(),
            });
        } else {
            post(`${baseURI}`, {
                onSuccess: () => history.back(),
            });
        }
    };

    const handleCancel = () => {
        controller.index();
    };

    const handleDelete = () => {
        if (isEditing && confirm('Are you sure you want to delete?')) {
            setDeleting(true);
            controller.delete(tag);
        }
    };

    const handleProjectsChange = useCallback(
        (updatedValue: number[]) => {
            setData('projects', updatedValue);
        },
        [setData],
    );

    const projectCreate = useController('projects').create;

    return (
        <form onSubmit={handleSubmit} className={className}>
            <FormGridLayout>
                <>
                    <Label htmlFor="icon">Lucid Icon</Label>
                    <Provider store={store}>
                        <IconSelectorDropdownClient
                            id="icon"
                            value={data.icon_name as IconName}
                            onChange={(selectedIcon: IconName | null) => setData('icon_name', selectedIcon)}
                            className="w-full"
                        />
                    </Provider>
                    <InputError>{errors.icon_name}</InputError>
                </>
                <>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="name" />
                    <InputError>{errors.name}</InputError>
                </>
                <div className={!categories.length ? 'col-span-full' : ''}>
                    <Label htmlFor="projects" className="block">
                        Projects
                    </Label>
                    <BadgeSelectInput value={data.projects} onChange={handleProjectsChange} options={projects} onClickPlus={projectCreate} />
                    <InputError>{errors.projects}</InputError>
                </div>

                <>
                    {categories.length > 1 && (
                        <>
                            <Label htmlFor="category">Category</Label>
                            <Select defaultValue={data.category} onValueChange={(value) => setData('category', value as typeof data.category)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError>{errors.category}</InputError>
                        </>
                    )}
                </>
            </FormGridLayout>

            <div className="mt-8 flex justify-between">
                {isEditing && <DeleteButton onClick={handleDelete} disabled={deleting} />}
                <div className="flex w-full justify-end space-x-2">
                    <CancelButton onClick={handleCancel} />
                    <SaveButton disabled={processing} onClick={handleSubmit}>
                        {processing ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                    </SaveButton>
                </div>
            </div>
        </form>
    );
}
