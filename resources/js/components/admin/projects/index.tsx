import { router } from '@inertiajs/react';
import { Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { getIcon } from '@/lib/generated-icons';
import type { Projects } from '@/types/models';

export default function ProjectIndex({ projects }: { projects: Projects }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()));

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

    const handleBulkDelete = () => {
        if (selectedIds.length > 0) {
            router.delete('/projects/bulk-delete', {
                data: { ids: selectedIds },
                onSuccess: () => {
                    setSelectedIds([]);
                },
            });
        }
    };

    const allSelected = filteredProjects.length > 0 && selectedIds.length === filteredProjects.length;
    const someSelected = selectedIds.length > 0 && selectedIds.length < filteredProjects.length;

    return (
        <div className="w-full">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-foreground">Projects</h2>
                            {selectedIds.length > 0 && (
                                <Button variant="destructive" size="sm" onClick={handleBulkDelete} className="gap-2">
                                    <Trash2 className="h-4 w-4" />
                                    Delete ({selectedIds.length})
                                </Button>
                            )}
                        </div>

                        <Input
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />

                        <div className="rounded-md border">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2 text-left">
                                            <Checkbox
                                                checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                                                onCheckedChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="p-2 text-left">Icon</th>
                                        <th className="p-2 text-left">Title</th>
                                        <th className="p-2 text-left">Featured</th>
                                        <th className="p-2 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProjects.length > 0 ? (
                                        filteredProjects.map((project) => {
                                            const IconComponent = getIcon(project.icon_name);
                                            const isSelected = selectedIds.includes(project.id);

                                            return (
                                                <tr key={project.id} className="border-b hover:bg-muted/50">
                                                    <td className="p-2">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onCheckedChange={(checked) => handleSelectProject(project.id, !!checked)}
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
                                                            {project.subtitle && (
                                                                <div className="text-sm text-muted-foreground">{project.subtitle}</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        {project.featured && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
                                                    </td>
                                                    <td className="p-2">
                                                        {project.date ? (
                                                            <div className="text-sm text-muted-foreground">
                                                                {new Date(project.date).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                                No projects found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {selectedIds.length} of {filteredProjects.length} project(s) selected.
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
