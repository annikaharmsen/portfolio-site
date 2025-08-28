<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'icon_name' => $this->icon_name,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'featured' => $this->featured,
            'date' => $this->date,
            'repo_link' => $this->repo_link,
            'demo_link' => $this->demo_link,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'skills' => $this->skills,
            'technologies' => $this->technologies
        ];
    }
}
