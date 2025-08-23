<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Models\Skill;
use Illuminate\Console\Command;

class GenerateIconBundle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'icons:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate TypeScript icon bundle from database records';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Scanning database for icon names...');

        // Collect all unique icon names from database
        $iconNames = collect()
            ->merge(Project::pluck('icon_name'))
            ->merge(Skill::pluck('icon_name'))
            ->filter()
            ->unique()
            ->values();

        if ($iconNames->isEmpty()) {
            $this->warn('No icon names found in database.');
            return;
        }

        $this->info("Found {$iconNames->count()} unique icons: " . $iconNames->implode(', '));

        // Generate imports ( ExternalLink )
        $imports = $iconNames->map(function ($name) {
            return $this->toPascalCase($name);
        })->implode(', ');

        // Generate icon map ( 'external-link': ExternalLink )
        $iconMap = $iconNames->map(function ($name) {
            return "  '{$name}': " . $this->toPascalCase($name);
        })->implode(",\n");

        // Generate TypeScript content
        $content = "import { {$imports}, type LucideIcon } from 'lucide-react';\n\n";
        $content .= "export const iconMap: Record<string, LucideIcon> = {\n{$iconMap}\n};\n\n";
        $content .= "export const getIcon = (name: string): LucideIcon => {\n";
        $content .= "  return iconMap[name] || iconMap[Object.keys(iconMap)[0]];\n";
        $content .= "};\n\n";
        $content .= "export type IconName = keyof typeof iconMap;\n";

        // Write to file
        $filePath = resource_path('js/lib/generated-icons.ts');
        file_put_contents($filePath, $content);

        $this->info("Icon bundle generated at: {$filePath}");
        $this->info('Icons included: ' . $iconNames->implode(', '));
    }

    /**
     * Convert kebab-case, snake_case, or space separated type to PascalCase for Lucide icon imports.
     * Example: 'external-link' / 'external_link' / 'external link' -> 'ExternalLink'
     */
    private function toPascalCase(string $str): string
    {
        $str = str_replace(['-', '_'], ' ', $str);
        $str = ucwords($str);
        $str = str_replace([' '], '', $str);

        return $str;
    }
}
