import CreatableSelect from '@/components/creatable-select';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProjectConfig, TagConfig } from '@/config/config';
import useController from '@/hooks/use-controller';
import useIndentation from '@/hooks/use-indentation';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Project, Tags } from '@/types/models';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, DeleteButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import { store } from '../store';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { textAreaStyles } from '@/components/ui/textarea';

interface ProjectFormProps {
    project?: Project;
    tags: Tags;
    categories: string[];
}

export default function ProjectForm({ project, tags, categories }: ProjectFormProps) {
    const { errors } = usePage().props;
    const controller = useController(ProjectConfig.BASE_URI);

    const [processing, setProcessing] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const [bulletsText, setBulletsText] = useState<string>(project?.bullets?.join('\n') ?? '');

    const { data, setData, isDirty } = useForm({
        icon_name: (project?.icon_name as IconName | null) || null,
        title: project?.title || '',
        subtitle: project?.subtitle || '',
        repo_link: project?.repo_link || '',
        demo_link: project?.demo_link || '',
        date: project?.date || '',
        featured: project?.featured || false,
        hidden: project?.hidden || false,
        tags: project?.tags?.map((tag) => tag.id) || [],
        description: project?.description || '',
        bullets: project?.bullets ?? null,
        category: project?.category ?? null,
        label: project?.label ?? '',
    });
    useUnsavedWarning(isDirty && !processing && !deleting);

    // reload tag options when returning via history (preserves form state)
    useEffect(() => {
        const handlePopState = () => {
            router.reload({ only: ['tags'] });
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        const payload = {
            ...data,
            bullets: bulletsText
                ? bulletsText.split('\n').filter((line) => line.trim())
                : null,
        };
        if (project) {
            controller.update(project, payload, { onFinish: () => setProcessing(false) });
        } else {
            controller.store(payload, { onFinish: () => setProcessing(false) });
        }
    };

    const handleDelete = () => {
        setDeleting(true);
        if (project && confirm('Are you sure you want to delete this project?')) {
            controller.delete(project);
        }
    };

    const handleTagsChange = useCallback(
        (updatedValue: number[]) => {
            setData('tags', updatedValue);
        },
        [setData],
    );

    const createTag = useController(TagConfig.BASE_URI).create;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormGridLayout>
                    <>
                        <Label htmlFor="icon">Icon</Label>
                        <Provider store={store}>
                            <IconSelectorDropdownClient
                                id="icon"
                                value={data.icon_name}
                                onChange={(selectedIcon) => setData('icon_name', selectedIcon)}
                                className="w-full"
                            />
                        </Provider>
                        {errors.icon_name && <InputError message={errors.icon_name} />}
                    </>

                    <>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Project title" />
                        {errors.title && <InputError message={errors.title} />}
                    </>

                    <>
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input
                            id="subtitle"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                            placeholder="Brief description"
                        />
                        {errors.subtitle && <InputError message={errors.subtitle} />}
                    </>

                    <>
                        <Label htmlFor="repo_link">Github Repository</Label>
                        <Input
                            id="repo_link"
                            value={data.repo_link?.replace('https://github.com/', '') || ''}
                            onChange={(e) => setData('repo_link', e.target.value ? `https://github.com/${e.target.value}` : '')}
                            placeholder="username/project"
                        />
                        {errors.repo_link && <InputError message={errors.repo_link} />}
                    </>

                    <>
                        <Label htmlFor="demo_link">Demo Link</Label>
                        <Input
                            id="demo_link"
                            type="url"
                            value={data.demo_link}
                            onChange={(e) => setData('demo_link', e.target.value)}
                            placeholder="https://demo.example.com"
                        />
                        {errors.demo_link && <InputError message={errors.demo_link} />}
                    </>

                    <div className="col-span-1/2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />
                        {errors.date && <InputError message={errors.date} />}
                    </div>

                    <div className="col-span-1/2 mt-4 flex items-center space-x-2">
                        <Checkbox id="featured" checked={data.featured} onCheckedChange={(checked) => setData('featured', !!checked)} />
                        <Label htmlFor="featured">Featured Project</Label>
                    </div>

                    <div className="col-span-1/2 mt-4 flex items-center space-x-2">
                        <Checkbox id="hidden" checked={data.hidden} onCheckedChange={(checked) => setData('hidden', !!checked)} />
                        <Label htmlFor="hidden">Hidden</Label>
                    </div>

                    <div className="md:col-span-full">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            onKeyDown={useIndentation}
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Detailed project description"
                            className="min-h-[120px] whitespace-pre-wrap"
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>

                    <div className="md:col-span-full">
                        <Label htmlFor="bullets">Bullets — one per line</Label>
                        <TextareaAutosize
                            id="bullets"
                            value={bulletsText}
                            onChange={(e) => setBulletsText(e.target.value)}
                            placeholder="each line becomes a resume bullet point"
                            className={cn(textAreaStyles, 'w-full resize-none')}
                            minRows={3}
                        />
                    </div>

                    <>
                        <Label htmlFor="category">Resume Category</Label>
                        <CreatableSelect
                            id="category"
                            value={data.category}
                            onChange={(val) => setData('category', val)}
                            options={categories}
                            placeholder="not on resume"
                        />
                        {errors.category && <InputError message={errors.category} />}
                    </>

                    <>
                        <Label htmlFor="label">Label</Label>
                        <Input
                            id="label"
                            value={data.label ?? ''}
                            onChange={(e) => setData('label', e.target.value)}
                            placeholder="e.g. 2025 or In Progress"
                        />
                        {errors.label && <InputError message={errors.label} />}
                    </>

                    <>
                        <Label htmlFor="tags" className="w-full">Tags</Label>
                        <BadgeSelectInput
                            value={data.tags}
                            onChange={handleTagsChange}
                            options={tags}
                            textResource="name"
                            onClickPlus={createTag}
                        />
                    </>
                    <InputError className="col-span-full">{errors.tags}</InputError>
                </FormGridLayout>

                <div className="mt-8 flex justify-between">
                    {project && <DeleteButton onClick={handleDelete} disabled={deleting} />}
                    <div className="flex w-full justify-end space-x-2">
                        <CancelButton onClick={controller.index} />
                        <SaveButton disabled={processing} onClick={handleSubmit}>
                            {processing ? 'Saving...' : project ? 'Update' : 'Create'}
                        </SaveButton>
                    </div>
                </div>
            </form>
        </>
    );
}
