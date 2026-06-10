<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SkillGroup;
use App\Models\SiteText;
use Barryvdh\DomPDF\Facade\Pdf;

class ResumeController extends Controller
{
    public function download()
    {
        $resumeTexts = SiteText::where('path', 'like', 'resume.%')->get()
            ->pluck('text', 'path');

        $resume = [
            'name' => $resumeTexts->get('resume.name', ''),
            'location' => $resumeTexts->get('resume.location', ''),
            'phone' => $resumeTexts->get('resume.phone', ''),
            'website' => $resumeTexts->get('resume.website', ''),
            'summary' => $resumeTexts->get('resume.summary', ''),
            'educations' => Education::ordered()->get(),
            'skill_groups' => SkillGroup::ordered()->get(),
            'projects' => Project::where('show_on_resume', true)
                ->orderBy('date', 'desc')
                ->get(),
            'experiences' => Experience::ordered()->get(),
        ];

        $pdf = Pdf::loadView('resume', compact('resume'))
            ->setPaper('letter');

        $filename = str_replace(' ', '_', strtolower($resume['name'])) . '_resume.pdf';

        return $pdf->download($filename);
    }
}
