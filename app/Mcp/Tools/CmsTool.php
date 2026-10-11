<?php

namespace App\Mcp\Tools;

use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

abstract class CmsTool extends Tool
{
    protected function json(mixed $data): Response
    {
        return Response::text(json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
    }

    protected function notFound(string $type, int $id): Response
    {
        return Response::error("No {$type} with id {$id}.");
    }
}
