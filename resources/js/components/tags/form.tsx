import { TagConfigInterface } from '@/config/config';
import useController from '@/hooks/use-controller';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, SkillGroups, Tag } from '@/types/models';
import { useForm, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, DeleteButton, SaveButton } from '../app-buttons';
import BadgeSelectInput, { SelectBadge } from '../badge-select-input';
import CreatableSkillGroupSelect from '../creatable-skill-group-select';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import InputError from '../input-error';
import { store } from '../store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import CreateProjectDialog from '../projects/create-project-dialog';

interface TagFormProps {
    tagConfig: TagConfigInterface;
    projects: Projects;
    tag?: Tag;
    className?: string;
    categories: string[];
    skillGroups: SkillGroups;
}

export default function TagForm({ tagConfig: { BASE_URI: baseURI }, projects, tag, className, categories, skillGroups }: TagFormProps) {
    const controller = useController(baseURI);
    const { errors } = usePage().props;

    const [processing, setProcessing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { data, setData, isDirty } = useForm({
        icon_name: (!!tag && tag.icon_name) || null,
        name: (!!tag && tag.name) || '',
        projects: (!!tag && tag.projects?.map((project) => project.id)) || [],
        category: tag?.category ?? null,
        skill_group_id: tag?.skill_group_id ?? null,
    });
    useUnsavedWarning(isDirty && !processing && !deleting);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setProcessing(true);
        if (tag) {
            controller.update(tag, data, { onFinish: () => setProcessing(false) });
        } else {
            controller.store(data, { onFinish: () => setProcessing(false) });
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
                <div>
                    <Label htmlFor="projects" className="block">
                        Projects
                    </Label>
                    <BadgeSelectInput value={data.projects} onChange={handleProjectsChange} options={projects} addAction={<CreateProjectDialog trigger={<SelectBadge>+</SelectBadge>} />} />
                    <InputError>{errors.projects}</InputError>
                </div>

                <>
                    <Label htmlFor="category">Category</Label>
                    <Select value={data.category ?? ''} onValueChange={(val) => setData('category', val || null)}>
                        <SelectTrigger id="category">
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
                    <InputError>{errors.category}</InputError>
                </>
                <>
                    <Label htmlFor="skill_group_id">Skill Group</Label>
                    <CreatableSkillGroupSelect
                        id="skill_group_id"
                        value={data.skill_group_id}
                        onChange={(val) => setData('skill_group_id', val)}
                        options={skillGroups}
                    />
                    <InputError>{errors.skill_group_id}</InputError>
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
