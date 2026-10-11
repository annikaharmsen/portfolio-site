<?php

namespace App\Mcp\Servers;

use App\Mcp\Tools\CreateContent;
use App\Mcp\Tools\DeleteContent;
use App\Mcp\Tools\GetContent;
use App\Mcp\Tools\ListContent;
use App\Mcp\Tools\ListSiteTexts;
use App\Mcp\Tools\ReplaceHeroSections;
use App\Mcp\Tools\ReplaceHighlights;
use App\Mcp\Tools\RestoreContent;
use App\Mcp\Tools\SetSiteText;
use App\Mcp\Tools\UpdateContent;
use App\Mcp\Tools\UpdateProjectTags;
use Laravel\Mcp\Server;
use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;

#[Name('Portfolio Admin')]
#[Version('1.0.0')]
#[Instructions('Manage the content of the live portfolio site (annikaharmsen.com) and the resume built from it. Every write is live on the public site. Content types: project, tag (skills and technologies), skill_group, experience, education, highlight, image (read-only), plus site texts and project hero sections. Read before writing: list_content / get_content give the ids and current values. Deletes are soft; restore_content undoes them.')]
class AdminServer extends Server
{
    protected array $tools = [
        ListContent::class,
        GetContent::class,
        CreateContent::class,
        UpdateContent::class,
        DeleteContent::class,
        RestoreContent::class,
        UpdateProjectTags::class,
        ReplaceHeroSections::class,
        ListSiteTexts::class,
        SetSiteText::class,
        ReplaceHighlights::class,
    ];
}
