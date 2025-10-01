import { H1 } from '@/components/headings';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useController from '@/hooks/use-controller';
import useIndentation from '@/hooks/use-indentation';
import FormGridLayout from '@/layouts/form-grid-layout';
import { Project, Skills, Technologies } from '@/types/models';
import { useForm } from '@inertiajs/react';
import React, { useCallback } from 'react';
import { Provider } from 'react-redux';
import { CancelButton, DeleteButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import IconSelectorDropdownClient, { IconName } from '../icon-selector-dropdown';
import { store } from '../store';

interface ProjectFormProps {
    project?: Project;
    skills: Skills;
    technologies: Technologies;
}

export default function ProjectForm({ project, skills, technologies }: ProjectFormProps) {
    const { data, setData, processing, errors, post, put } = useForm({
        icon_name: (project?.icon_name as IconName | null) || null,
        title: project?.title || '',
        subtitle: project?.subtitle || '',
        repo_link: project?.repo_link || '',
        demo_link: project?.demo_link || '',
        date: project?.date || '',
        featured: project?.featured || false,
        skills: project?.skills?.map((skill) => skill.id) || [],
        technologies: project?.technologies?.map((technology) => technology.id) || [],
        description: project?.description || '',
    });

    const controller = useController('projects');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (project) {
            put(`/projects/${project.id}`, {
                onSuccess: () => controller.index(),
            });
        } else {
            post('/projects', {
                onSuccess: () => controller.index(),
            });
        }
    };

    const handleCancel = () => {
        controller.index();
    };

    const handleDelete = () => {
        if (project && confirm('Are you sure you want to delete this project?')) {
            controller.delete(project);
        }
    };

    const handleSkillsChange = useCallback(
        (updatedValue: number[]) => {
            setData('skills', updatedValue);
        },
        [setData],
    );

    const handleTechnologiesChange = useCallback(
        (updatedValue: number[]) => {
            setData('technologies', updatedValue);
        },
        [setData],
    );

    return (
        <>
            <div className="mb-2 flex items-center justify-between md:mb-4">
                <H1>{project ? 'Edit Project' : 'Create Project'}</H1>
                {project && <DeleteButton onClick={handleDelete} />}
            </div>
            <Card>
                <CardContent>
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
                                {skills.length ? (
                                    <>
                                        <BadgeSelectInput
                                            id="skills"
                                            value={data.skills}
                                            onChange={handleSkillsChange}
                                            options={skills}
                                            textResource="name"
                                        />

                                        <InputError>{errors.skills}</InputError>
                                    </>
                                ) : (
                                    <p className="pl-1 text-sm text-muted-foreground">no skills found</p>
                                )}
                            </>

                            <>
                                <Label htmlFor="technologies" className="w-full">
                                    Technologies
                                </Label>
                                {technologies.length ? (
                                    <>
                                        <BadgeSelectInput
                                            id="technologies"
                                            value={data.technologies}
                                            onChange={handleTechnologiesChange}
                                            options={technologies}
                                            textResource="name"
                                        />

                                        <InputError>{errors.technologies}</InputError>
                                    </>
                                ) : (
                                    <p className="pl-1 text-sm text-muted-foreground">no technologies found</p>
                                )}
                            </>
                        </FormGridLayout>

                        <div className="flex justify-end space-x-2">
                            <CancelButton onClick={handleCancel} />
                            <SaveButton disabled={processing} onClick={handleSubmit}>
                                {processing ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
                            </SaveButton>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
