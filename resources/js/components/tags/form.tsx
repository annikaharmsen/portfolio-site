import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, ProjectTag } from '@/types/models';
import { router, useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import InputError from '../input-error';
import { store } from '../store';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TagFormProps {
    tag?: ProjectTag;
    baseURI: string;
    projects: Projects;
    className?: string;
}

export default function TagForm({ tag, baseURI, projects, className }: TagFormProps) {
    const { data, setData, processing, errors, post, put } = useForm({
        icon_name: tag?.icon_name || '',
        name: tag?.name || '',
        projects: tag?.projects?.map((project) => project.id) || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (tag) {
            put(`/${baseURI}/${tag.id}`);
        } else {
            post(`/${baseURI}`);
        }
    };

    const handleCancel = () => {
        router.get(`/${baseURI}`);
    };

    const handleProjectsChange = useCallback(
        (updatedValue: number[]) => {
            setData('projects', updatedValue);
        },
        [setData],
    ); //TODO

    return (
        <form onSubmit={handleSubmit} className={className}>
            <FormGridLayout>
                <>
                    <Label htmlFor="icon">Lucid Icon</Label>
                    <Provider store={store}>
                        <IconSelectorDropdownClient
                            id="icon"
                            value={data.icon_name as IconName}
                            onChange={(selectedIcon) => setData('icon_name', selectedIcon)}
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
                <div className="col-span-full">
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
            </FormGridLayout>

            <div className="flex justify-end space-x-2">
                <CancelButton onClick={handleCancel} />
                <SaveButton disabled={processing} onClick={handleSubmit}>
                    {processing ? 'Saving...' : tag ? 'Update' : 'Create'}
                </SaveButton>
            </div>
        </form>
    );
}
