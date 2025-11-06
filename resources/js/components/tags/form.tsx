import { ProjectConfig, TagConfigInterface } from '@/config/config';
import useController from '@/hooks/use-controller';
import useReroute from '@/hooks/use-reroute';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, Tag } from '@/types/models';
import { router, useForm, usePage } from '@inertiajs/react';
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
    const controller = useController(baseURI);
    const { reroute } = useReroute();
    const { errors } = usePage().props;

    const [processing, setProcessing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { data, setData, isDirty } = useForm({
        icon_name: (!!tag && tag.icon_name) || null,
        name: (!!tag && tag.name) || '',
        projects: (!!tag && tag.projects?.map((project) => project.id)) || [],
        category: (!!tag && tag.category) || categories.length === 1 ? categories[0] : undefined,
    });
    useUnsavedWarning(isDirty && !processing && !deleting);

    useEffect(() => {
        const handlePopState = () => {
            router.reload({ only: ['projects'] });
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setProcessing(true);
        if (tag) {
            controller.update(tag, data, { onSuccess: reroute, onFinish: () => setProcessing(false) });
        } else {
            controller.store(data, { onSuccess: reroute, onFinish: () => setProcessing(false) });
        }
    };

    const handleDelete = () => {
        if (!!tag && confirm('Are you sure you want to delete?')) {
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

    const createProject = useController(ProjectConfig.BASE_URI).create;

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
                    <BadgeSelectInput value={data.projects} onChange={handleProjectsChange} options={projects} onClickPlus={createProject} />
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
                {!!tag && <DeleteButton onClick={handleDelete} disabled={deleting} />}
                <div className="flex w-full justify-end space-x-2">
                    <CancelButton onClick={controller.index} />
                    <SaveButton disabled={processing} onClick={handleSubmit}>
                        {processing ? 'Saving...' : tag ? 'Update' : 'Create'}
                    </SaveButton>
                </div>
            </div>
        </form>
    );
}
