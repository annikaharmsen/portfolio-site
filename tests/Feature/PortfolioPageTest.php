<?php

namespace Tests\Feature;

use App\Models\Highlight;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PortfolioPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_portfolio_page_passes_highlights_in_order(): void
    {
        $this->withoutVite();
        User::factory()->create();
        Highlight::create(['text' => 'Second', 'sort_order' => 1]);
        Highlight::create(['text' => 'First', 'sort_order' => 0]);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->component('portfolio')
            ->has('highlights', 2)
            ->where('highlights.0.text', 'First')
            ->where('highlights.1.text', 'Second')
        );
    }
}
