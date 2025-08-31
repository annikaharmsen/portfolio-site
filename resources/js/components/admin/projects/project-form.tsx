import DeleteButton from '@/components/admin/delete-button';
import InputError from '@/components/admin/input-error';
import { H1 } from '@/components/headings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/models';
import { router, useForm } from '@inertiajs/react';

interface ProjectFormProps {
    project?: Project;
}

export default function ProjectForm({ project }: ProjectFormProps) {
    const { data, setData, processing, errors, post, put } = useForm({
        icon_name: project?.icon_name || '',
        title: project?.title || '',
        subtitle: project?.subtitle || '',
        description: project?.description || '',
        repo_link: project?.repo_link || '',
        demo_link: project?.demo_link || '',
        featured: project?.featured || false,
        date: project?.date || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (project) {
            put(`/projects/${project.id}`);
        } else {
            post('/projects');
        }
    };

    const handleCancel = () => {
        if (project) router.get(`/projects/${project.id}`);
        else router.get('/projects');
    };

    const handleDelete = () => {
        if (project && confirm('Are you sure you want to delete this project?')) {
            router.delete(`/projects/${project.id}`);
        }
    };

    return (
        <>
            <div className="mb-2 flex items-center justify-between md:mb-4">
                <H1>{project ? 'Edit Project' : 'Create Project'}</H1>
                {project && <DeleteButton onClick={handleDelete} />}
            </div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="icon_name">Icon Name</Label>
                                <Input
                                    id="icon_name"
                                    value={data.icon_name}
                                    onChange={(e) => setData('icon_name', e.target.value)}
                                    placeholder="e.g. lucide-react"
                                />
                                {errors.icon_name && <InputError message={errors.icon_name} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Project title" />
                                {errors.title && <InputError message={errors.title} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Brief description"
                            />
                            {errors.subtitle && <InputError message={errors.subtitle} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Detailed project description"
                                className="min-h-[120px]"
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="repo_link">Github Repository</Label>
                                <Input
                                    id="repo_link"
                                    value={data.repo_link?.replace('https://github.com/', '') || ''}
                                    onChange={(e) => setData('repo_link', e.target.value ? `https://github.com/${e.target.value}` : '')}
                                    placeholder="username/project"
                                />
                                {errors.repo_link && <InputError message={errors.repo_link} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="demo_link">Demo Link</Label>
                                <Input
                                    id="demo_link"
                                    type="url"
                                    value={data.demo_link}
                                    onChange={(e) => setData('demo_link', e.target.value)}
                                    placeholder="https://demo.example.com"
                                />
                                {errors.demo_link && <InputError message={errors.demo_link} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} />
                                {errors.date && <InputError message={errors.date} />}

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="featured" checked={data.featured} onCheckedChange={(checked) => setData('featured', !!checked)} />
                                    <Label htmlFor="featured">Featured Project</Label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
