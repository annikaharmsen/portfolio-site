import useController from '@/hooks/use-controller';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, ProjectTag } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { useCallback, useState } from 'react';
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
    tag?: ProjectTag;
    baseURI: string;
    projects: Projects;
    className?: string;
    categories?: string[];
}

export default function TagForm({ tag, baseURI, projects, className, categories = [] }: TagFormProps) {
    const { data, setData, processing, errors, post, put, isDirty } = useForm({
        icon_name: (tag?.icon_name as IconName | null) || null,
        name: tag?.name || '',
        projects: tag?.projects?.map((project) => project.id) || [],
        category: tag?.category || undefined,
    });

    const [deleting, setDeleting] = useState(false);

    const controller = useController(baseURI);

    useUnsavedWarning(isDirty && !processing && !deleting);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (tag) {
            put(`/${baseURI}/${tag.id}`, {
                onSuccess: () => controller.index(),
            });
        } else {
            post(`/${baseURI}`, {
                onSuccess: () => controller.index(),
            });
        }
    };

    const handleCancel = () => {
        controller.index();
    };

    const handleDelete = () => {
        if (tag && confirm('Are you sure you want to delete?')) {
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
                    {projects.length ? (
                        <>
                            <BadgeSelectInput id="projects" value={data.projects} onChange={handleProjectsChange} options={projects} />
                            <InputError>{errors.projects}</InputError>
                        </>
                    ) : (
                        <p className="pl-1 text-sm text-muted-foreground">no projects found</p>
                    )}
                </div>

                <>
                    {!!categories.length && (
                        <>
                            <Label htmlFor="category">Category</Label>
                            <Select defaultValue={data.category} onValueChange={(value) => setData('category', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem value={category}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </>
                    )}
                </>
            </FormGridLayout>

            <div className="mt-8 flex justify-between">
                {tag && <DeleteButton onClick={handleDelete} disabled={deleting} />}
                <div className="flex w-full justify-end space-x-2">
                    <CancelButton onClick={handleCancel} />
                    <SaveButton disabled={processing} onClick={handleSubmit}>
                        {processing ? 'Saving...' : tag ? 'Update' : 'Create'}
                    </SaveButton>
                </div>
            </div>
        </form>
    );
}
