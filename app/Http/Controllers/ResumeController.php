<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;

class ResumeController extends Controller
{
    public function download()
    {
        $user = User::first();

        $resume = [
            'name' => $user->name,
            'location' => $user->location,
            'phone' => $user->phone,
            'email' => $user->email,
            'website' => config('app.url'),
            'summary' => $user->summary,
            'educations' => Education::ordered()->get(),
            'projects' => Project::forCategory('projects')->get(),
            'personal_projects' => Project::forCategory('personal')->get(),
            'experiences' => Experience::ordered()->get(),
            'skill_groups' => SkillGroup::with('tags')->ordered()->get(),
        ];

        $pdf = Pdf::loadView('resume', compact('resume'))
            ->setPaper('letter');

        $filename = str_replace(' ', '_', strtolower($resume['name'])) . '_resume.pdf';

        return $pdf->download($filename);
    }
}
