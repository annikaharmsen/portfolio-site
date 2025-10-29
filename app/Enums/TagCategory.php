<?php

namespace App\Enums;

enum TagCategory: string
{
    case frontend = 'frontend';
    case backend = 'backend';
    case tool = 'tool';

    case skill = 'skill';

}
