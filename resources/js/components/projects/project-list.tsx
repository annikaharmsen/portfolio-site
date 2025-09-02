import { Link, router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

import DeleteButton from '@/components/delete-button';
import { H1, H2 } from '@/components/headings';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { getIcon } from '@/lib/generated-icons';
import { cn } from '@/lib/utils';
import type { Project, Projects } from '@/types/models';

interface ProjectListProps {
    projects: Projects;
    className?: string;
    asCard?: boolean;
}

export default function ProjectList({ projects, className, asCard = false }: ProjectListProps) {
    // STATE VARIABLES
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // HANDLER FUNCTIONS
    const handleSelectAll = (checked: boolean) => {
        setSelectedIds(checked ? filteredProjects.map((p) => p.id) : []);
    };

    const handleSelectProject = (projectId: number, checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => [...prev, projectId]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== projectId));
        }
    };

    const handleShow = (project: Project) => {
        router.get(`/projects/${project.id}`);
    };

    const handleCreate = () => {
        router.get('/projects/create');
    };

    const handleBulkDelete = () => {
        const quantity = selectedIds.length;
        if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} project${quantity != 1 ? 's' : ''}?`)) {
            router.delete('/projects/bulk-delete', {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setSelectedIds([]);
                },
            });
        }
    };

    const toggleFeatured = (project: Project) => {
        router.put(`/projects/${project.id}`, { ...project, featured: !project.featured });
    };

    // LOCAL VARIABLES

    const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const allSelected = filteredProjects.length > 0 && selectedIds.length === filteredProjects.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < filteredProjects.length;

    return (
        <div className={cn('min-w-140 space-y-4', className)}>
            <div className="flex items-center justify-between">
                {asCard ? (
                    <Link href={asCard ? '/projects' : '#'}>
                        <H2>Projects</H2>
                    </Link>
                ) : (
                    <H1>Projects</H1>
                )}
                {!!selectedIds.length && <DeleteButton onClick={handleBulkDelete} quantity={selectedIds.length} />}
            </div>

            <Input placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full min-w-min" />

            <div className="rounded-md border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">
                                <Checkbox checked={allSelected ? true : someSelected ? 'indeterminate' : false} onCheckedChange={handleSelectAll} />
                            </th>
                            <th className="p-2 text-center">Icon</th>
                            <th className="p-2 text-left">Title</th>
                            <th className="p-2 text-center">Featured</th>
                            <th className="p-2 pr-4 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => {
                                const IconComponent = getIcon(project.icon_name);
                                const isSelected = selectedIds.includes(project.id);

                                return (
                                    <tr key={project.id} className="border-b hover:bg-muted/50" onClick={() => handleShow(project)}>
                                        <td className="p-2">
                                            <Checkbox
                                                checked={isSelected}
                                                onCheckedChange={(checked) => handleSelectProject(project.id, !!checked)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center justify-center">
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="space-y-1">
                                                <div className="font-medium">{project.title}</div>
                                                {project.subtitle && <div className="text-sm text-muted-foreground">{project.subtitle}</div>}
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <Star
                                                className={cn(
                                                    'm-auto h-4 w-4 cursor-pointer text-yellow-500',
                                                    project.featured ? 'fill-yellow-500' : '',
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFeatured(project);
                                                }}
                                            />
                                        </td>
                                        <td className="p-2" onClick={() => handleShow(project)}>
                                            <div className="mr-4 text-right text-sm text-muted-foreground">
                                                {project.date ? (
                                                    new Date(project.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })
                                                ) : (
                                                    <span className="text-muted-foreground">—</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="h-24 border-b text-center text-muted-foreground">
                                <td colSpan={5}>No projects found.</td>
                            </tr>
                        )}
                        <tr onClick={() => handleCreate()} className="h-12 text-center hover:bg-accent/50">
                            <td colSpan={5}>+ Add Project</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="ml-2 flex justify-between">
                <div className="text-sm text-muted-foreground">
                    {selectedIds.length} of {filteredProjects.length} project(s) selected.
                </div>
            </div>
        </div>
    );
}
