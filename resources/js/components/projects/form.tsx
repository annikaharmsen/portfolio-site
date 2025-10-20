import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SkillConfig, TechConfig } from '@/config/config';
import useController from '@/hooks/use-controller';
import useIndentation from '@/hooks/use-indentation';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Project, Tags } from '@/types/models';
import { router, useForm } from '@inertiajs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, DeleteButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import { store } from '../store';

interface ProjectFormProps {
    project?: Project;
    tags: Tags;
}

export default function ProjectForm({ project, tags }: ProjectFormProps) {
    const skills = tags.filter((tag) => tag.category && SkillConfig.CATEGORIES.includes(tag.category));
    const technologies = tags.filter((tag) => tag.category && TechConfig.CATEGORIES.includes(tag.category));

    const { data, setData, processing, errors, post, put, isDirty } = useForm({
        icon_name: (project?.icon_name as IconName | null) || null,
        title: project?.title || '',
        subtitle: project?.subtitle || '',
        repo_link: project?.repo_link || '',
        demo_link: project?.demo_link || '',
        date: project?.date || '',
        featured: project?.featured || false,
        tags: project?.tags?.map((tag) => tag.id) || [],
        description: project?.description || '',
    });

    const [deleting, setDeleting] = useState(false);

    const controller = useController('projects');

    // Warn user about unsaved changes
    useUnsavedWarning(isDirty && !processing && !deleting);

    // Reload options when returning via history (preserves form state)
    useEffect(() => {
        const handlePopState = () => {
            router.reload({ only: ['skills', 'technologies'] });
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (project) {
            controller.update(put, `/projects/${project.id}`);
        } else {
            controller.store(post, '/projects');
        }
    };

    const handleCancel = () => {
        controller.index();
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

    const technologyCreate = useController('technologies').create;
    const skillCreate = useController('skills').create;

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

                    <>
                        <Label htmlFor="skills" className="w-full">
                            Skills
                        </Label>
                        <BadgeSelectInput
                            value={data.tags.filter((tag) => skills.find((skill) => skill.id === tag))}
                            onChange={handleTagsChange}
                            options={skills}
                            textResource="name"
                            onClickPlus={skillCreate}
                        />
                    </>

                    <>
                        <Label htmlFor="technologies" className="w-full">
                            Technologies
                        </Label>
                        <BadgeSelectInput
                            value={data.tags.filter((tag) => technologies.find((technology) => technology.id === tag))}
                            onChange={handleTagsChange}
                            options={technologies}
                            textResource="name"
                            onClickPlus={technologyCreate}
                        />
                    </>
                    <InputError className="col-span-full">{errors.tags}</InputError>
                </FormGridLayout>

                <div className="mt-8 flex justify-between">
                    {project && <DeleteButton onClick={handleDelete} disabled={deleting} />}
                    <div className="flex w-full justify-end space-x-2">
                        <CancelButton onClick={handleCancel} />
                        <SaveButton disabled={processing} onClick={handleSubmit}>
                            {processing ? 'Saving...' : project ? 'Update' : 'Create'}
                        </SaveButton>
                    </div>
                </div>
            </form>
        </>
    );
}
