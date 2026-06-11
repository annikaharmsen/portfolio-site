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
        $resume = $this->resumeData();

        $pdf = Pdf::loadView('resume', compact('resume'))
            ->setPaper('letter');

        $fullName = trim("{$resume['first_name']} {$resume['last_name']}");
        $filename = str_replace(' ', '_', strtolower($fullName)).'_resume.pdf';

        return $pdf->download($filename);
    }

    public function preview()
    {
        $resume = $this->resumeData();

        return view('resume', compact('resume'));
    }

    private function resumeData(): array
    {
        $user = User::first();

        return [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
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
    }
}
