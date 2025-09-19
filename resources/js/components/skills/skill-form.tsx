import FormGridLayout from '@/layouts/form-grid-layout';
import { Projects, Skill } from '@/types/models';
import { router, useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import { CancelButton, SaveButton } from '../app-buttons';
import BadgeSelectInput from '../badge-select-input';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface SkillFormProps {
    skill?: Skill;
    projects: Projects;
    className?: string;
}

export default function SkillForm({ skill, projects, className }: SkillFormProps) {
    const { data, setData, processing, errors, post, put } = useForm({
        icon_name: skill?.icon_name || '',
        name: skill?.name || '',
        projects: skill?.projects?.map((project) => project.id) || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (skill) {
            put(`/skills/${skill.id}`);
        } else {
            post('/skills');
        }
    };

    const handleCancel = () => {
        if (skill) router.get(`/skills/${skill.id}`);
        else router.get('/skills');
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
                    <Label htmlFor="icon_name">Lucid Icon</Label>
                    <Input
                        id="icon_name"
                        value={data.icon_name}
                        onChange={(e) => setData('icon_name', e.target.value)}
                        placeholder="e.g. lucide-react"
                    />
                    <InputError>{errors.icon_name}</InputError>
                </>
                <>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Skill Name" />
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
                    {processing ? 'Saving...' : skill ? 'Update Skill' : 'Create Skill'}
                </SaveButton>
            </div>
        </form>
    );
}
