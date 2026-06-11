{{-- resources/views/resume.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page {
            margin: 72px 72px 72px 72px;
        }

        /* preflight — scoped to .page to avoid clobbering @page margins */
        .page * { font-family: 'Times New Roman', Times, serif; font-size: 11pt; margin: 0; padding: 0; }
        .page h1, .page h2 { font-weight: bold; text-align: center; margin-top: 4pt; }
        .page h3 { font-weight: bold; margin-top: 4pt; }
        .page ul { padding-left: 20pt; }

        /* base */
        body { line-height: 1.3; color: #000; }
        .page a { color: #1155cc; text-decoration: none; }

        /* browser preview */
        @media screen {
            body { background: #e5e5e5; }
            .page { max-width: 8.5in; min-height: 11in; margin: 0 auto; padding: 1in; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); box-sizing: border-box; }
        }

        /* utilities */
        .page .text-center { text-align: center; }
        .page .text-left { text-align: left; }
        .page .text-right { text-align: right; }
        .page .font-bold { font-weight: bold; }
        .page .float-right { float: right; }
        .page .whitespace-nowrap { white-space: nowrap; }
        .page .w-full { width: 100%; }
        .page .align-top { vertical-align: top; }
        .page .border-collapse { border-collapse: collapse; }
        .page .indent { text-indent: 1.27cm; }
        .page .inline { display: inline; }

        /* spacing */
        .page .mb-2 { margin-bottom: 2pt; }
        .page .mb-4 { margin-bottom: 4pt; }
        .page .mb-6 { margin-bottom: 6pt; }
        .page .mb-8 { margin-bottom: 8pt; }
        .page .mt-10 { margin-top: 10pt; }
        .page .my-2 { margin-top: 2pt; margin-bottom: 2pt; }
        .page .py-2 { padding-top: 2pt; padding-bottom: 2pt; }
        .page .pr-8 { padding-right: 8pt; }

        /* page-break control */
        .page h1, .page h2, .page h3 { page-break-after: avoid; }
        .page .entry { page-break-inside: avoid; }
    </style>
</head>
<body>
<div class="page">
    <div class="text-center">
        <h1>{{ $resume['first_name'] }} {{ $resume['last_name'] }}</h1>
        <div>
            {{ $resume['location'] }} | {{ $resume['phone'] }} |
            <a href="{{ $resume['website'] }}">{{ $resume['website'] }}</a>
        </div>
    </div>

    <h2 class="text-center">Professional Summary</h2>
    <div class="text-left indent">{{ $resume['summary'] }}</div>

    @if (count($resume['educations']) > 0)
    <h2 class="text-center">Education</h2>
    @foreach ($resume['educations'] as $edu)
        <div class="entry">
            <h3>{{ $edu->institution }}</h3>
            <p>{{ $edu->title }} – <span class="font-bold">{{ $edu->gpa }} GPA</span></p>
            <p>{{ $edu->graduation_date->format('F Y') }}</p>
            @if ($edu->bullets)
                <ul>
                @foreach ($edu->bullets as $bullet)
                <li>{{ $bullet }}</li>
                @endforeach
                </ul>
            @endif
        </div>
    @endforeach
    @endif

    @if ($resume['projects']->flatten()->isNotEmpty())
    @foreach ($resume['projects'] as $category => $projects)
        <h2 class="text-center">{{ $category ?: 'Projects' }}</h2>
        @foreach ($projects as $project)
            <div class="entry">
                <h3>{{ $project->title }}@if ($project->subtitle) — {{ $project->subtitle }}@endif @if ($project->label) ({{ $project->label }})@endif</h3>
                @if ($project->description)
                    <p>{{ $project->description }}</p>
                @endif
                @if ($project->bullets)
                    <ul>
                    @foreach ($project->bullets as $bullet)
                    <li>{{ $bullet }}</li>
                    @endforeach
                    </ul>
                @endif
                @if ($project->repo_link || $project->demo_link)
                    <p>
                        @if ($project->repo_link)
                            <a href="{{ $project->repo_link }}">GitHub</a>
                        @endif
                        @if ($project->repo_link && $project->demo_link) | @endif
                        @if ($project->demo_link)
                            <a href="{{ $project->demo_link }}">Live Demo</a>
                        @endif
                    </p>
                @endif
            </div>
        @endforeach
    @endforeach
    @endif

    @if (count($resume['experiences']) > 0)
    <h2 class="text-center">Professional Experience</h2>
    @foreach ($resume['experiences'] as $exp)
        <div class="entry">
            <h3>{{ $exp->title }} — {{ $exp->company }}</h3>
            <p>{{ $exp->location }} — {{ $exp->formatted_date_ranges }}</p>
            @if ($exp->bullets)
                <ul>
                @foreach ($exp->bullets as $bullet)
                <li>{{ $bullet }}</li>
                @endforeach
                </ul>
            @endif
        </div>
    @endforeach
    @endif

    @if (count($resume['skill_groups']) > 0)
    <h2 class="text-center">Technical Skills</h2>
        @foreach ($resume['skill_groups'] as $group)
                <div>
                    <h3 class="inline">{{ $group->name }}</h3>
                    <p class="inline">{{ $group->tags->pluck('name')->join(', ') }}</p></div>
        @endforeach
    @endif
</div>
</body>
</html>
