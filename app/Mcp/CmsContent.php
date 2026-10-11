<?php

namespace App\Mcp;

use App\Http\Requests\StoreEducationRequest;
use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\StoreSkillGroupRequest;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateEducationRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\UpdateSkillGroupRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Highlight;
use App\Models\Image;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\Tag;
use App\Services\Cms\ProjectService;
use App\Services\Cms\SkillGroupService;
use App\Services\Cms\TagService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * The CMS content types the admin MCP server reads and writes, and how each one is validated and saved.
 * Validation uses the admin form requests' rules and messages; saving uses the same services as the admin controllers.
 */
class CmsContent
{
    /**
     * type => [model, store request, update request, relations loaded by get_content, writable]
     */
    private const TYPES = [
        'project' => [Project::class, StoreProjectRequest::class, UpdateProjectRequest::class, ['tags', 'hero_sections.image']],
        'tag' => [Tag::class, StoreTagRequest::class, UpdateTagRequest::class, ['projects', 'skillGroup']],
        'skill_group' => [SkillGroup::class, StoreSkillGroupRequest::class, UpdateSkillGroupRequest::class, ['tags']],
        'experience' => [Experience::class, StoreExperienceRequest::class, UpdateExperienceRequest::class, []],
        'education' => [Education::class, StoreEducationRequest::class, UpdateEducationRequest::class, []],
        'highlight' => [Highlight::class, null, null, []],
        'image' => [Image::class, null, null, []],
    ];

    /** Fields each writable type accepts, shown to the model in the tool descriptions. */
    public const FIELDS = <<<'TXT'
        project: icon_name (Lucide icon name, required), title (required), subtitle, description, bullets (string[]), category, label, repo_link (url), demo_link (url), featured (bool), hidden (bool), date (Y-m-d; the site lists featured first, then newest date), tags (tag ids; replaces the project's tags)
        tag (a skill or technology): icon_name (required), name (required), category (tech|skill), skill_group_id, projects (project ids; replaces the tag's projects)
        skill_group: name (required), sort_order (int)
        experience: title, company (required), location, date_ranges (required, [{start: date, end: date|null}]), bullets (string[]), sort_order (int)
        education: title, institution, graduation_date (required), gpa, bullets (string[]), sort_order (int)
        TXT;

    /** @return list<string> */
    public static function types(): array
    {
        return array_keys(self::TYPES);
    }

    /** @return list<string> */
    public static function writableTypes(): array
    {
        return array_keys(array_filter(self::TYPES, fn (array $type) => $type[1] !== null));
    }

    public static function query(string $type, string $trashed = 'without'): Builder
    {
        $model = self::TYPES[$type][0];
        $query = $model::query();

        $query = match ($trashed) {
            'with' => method_exists($model, 'bootSoftDeletes') ? $query->withTrashed() : $query,
            'only' => method_exists($model, 'bootSoftDeletes') ? $query->onlyTrashed() : $query->whereRaw('1 = 0'),
            default => $query,
        };

        return match ($type) {
            'project', 'skill_group', 'experience', 'education', 'highlight' => $query->ordered(),
            'image' => $query->latest('id'),
            default => $query,
        };
    }

    public static function find(string $type, int $id, bool $withTrashed = false): ?Model
    {
        $model = self::TYPES[$type][0];
        $query = $withTrashed && method_exists($model, 'bootSoftDeletes') ? $model::withTrashed() : $model::query();

        return $query->find($id);
    }

    public static function withRelations(string $type, Model $record): Model
    {
        return $record->load(self::TYPES[$type][3]);
    }

    /**
     * @throws ValidationException
     */
    public static function create(string $type, array $data): Model
    {
        $validated = self::validate(self::TYPES[$type][1], $data);

        return match ($type) {
            'project' => app(ProjectService::class)->create($validated),
            'tag' => app(TagService::class)->create($validated),
            default => self::TYPES[$type][0]::create($validated),
        };
    }

    /**
     * Partial update: the given fields are validated together with the record's current values, so the
     * update request's required fields don't have to be resent. Only the given fields are written.
     *
     * @throws ValidationException
     */
    public static function update(string $type, Model $record, array $data): Model
    {
        $current = Arr::only($record->attributesToArray(), $record->getFillable());
        $validated = self::validate(self::TYPES[$type][2], array_merge($current, $data));
        $changes = Arr::only($validated, array_keys($data));

        match ($type) {
            'project' => app(ProjectService::class)->update($record, $changes),
            'tag' => app(TagService::class)->update($record, $changes),
            default => $record->update($changes),
        };

        return $record->refresh();
    }

    public static function delete(string $type, Model $record): void
    {
        match ($type) {
            'skill_group' => app(SkillGroupService::class)->delete($record),
            default => $record->delete(),
        };
    }

    /**
     * @param  class-string<FormRequest>  $requestClass
     *
     * @throws ValidationException
     */
    private static function validate(string $requestClass, array $data): array
    {
        $request = new $requestClass;

        return Validator::validate($data, $request->rules(), $request->messages());
    }
}
