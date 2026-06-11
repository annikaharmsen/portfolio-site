{{-- resources/views/resume.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page {
            margin: 72px 72px 72px 72px;
        }

        /* preflight */
        * { font-family: 'Times New Roman', Times, serif; font-size: 11pt; margin: 0; padding: 0; }
        h1, h2 { font-weight: bold; text-align: center; margin-top: 4pt; }
        h3 { font-weight: bold; margin-top: 4pt; }
        ul { padding-left: 20pt; }

        /* base */
        body { line-height: 1.3; color: #000; }
        a { color: #1155cc; text-decoration: none; }

        /* browser preview */
        @media screen {
            body { background: #e5e5e5; padding: 40px 0; }
            .page { width: 8.5in; min-height: 11in; margin: 0 auto; padding: 1in; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); box-sizing: border-box; }
        }

        /* utilities */
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .float-right { float: right; }
        .whitespace-nowrap { white-space: nowrap; }
        .w-full { width: 100%; }
        .align-top { vertical-align: top; }
        .border-collapse { border-collapse: collapse; }
        .indent { text-indent: 1.27cm; }

        /* spacing */
        .mb-2 { margin-bottom: 2pt; }
        .mb-4 { margin-bottom: 4pt; }
        .mb-6 { margin-bottom: 6pt; }
        .mb-8 { margin-bottom: 8pt; }
        .mt-10 { margin-top: 10pt; }
        .my-2 { margin-top: 2pt; margin-bottom: 2pt; }
        .py-2 { padding-top: 2pt; padding-bottom: 2pt; }
        .pr-8 { padding-right: 8pt; }
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

    <h2 class="text-center">Education</h2>
    @foreach ($resume['educations'] as $edu)
        <div>
            <h3>{{ $edu->institution }} — {{ $edu->title }} – {{ $edu->gpa }} GPA — {{ $edu->graduation_date->format('F Y') }}</h3>
            @if ($edu->bullets)
                <ul>
                @foreach ($edu->bullets as $bullet)
                <li>{{ $bullet }}</li>
                @endforeach
                </ul>
            @endif
        </div>
    @endforeach

    <h2 class="text-center">Projects</h2>
    @foreach ($resume['projects'] as $project)
        <div>
            <h3>{{ $project->title }}@if ($project->subtitle) — {{ $project->subtitle }}@endif</h3>
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
        </div>
    @endforeach

    <h2 class="text-center">Personal Projects</h2>
    @foreach ($resume['personal_projects'] as $project)
        <div>
            <h3>{{ $project->title }}@if ($project->subtitle) — {{ $project->subtitle }}@endif @if ($project->label)({{ $project->label }})@endif</h3>
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
        </div>
    @endforeach

    <h2 class="text-center">Professional Experience</h2>
    @foreach ($resume['experiences'] as $exp)
        <div>
            <h3>{{ $exp->title }} — {{ $exp->company }} | {{ $exp->location }} — {{ $exp->formatted_date_ranges }}</h3>
            @if ($exp->bullets)
                <ul>
                @foreach ($exp->bullets as $bullet)
                <li>{{ $bullet }}</li>
                @endforeach
                </ul>
            @endif
        </div>
    @endforeach

    <h2 class="text-center">Technical Skills</h2>
    <table class="w-full border-collapse">
        @foreach ($resume['skill_groups'] as $group)
            <tr>
                <td class="font-bold whitespace-nowrap align-top text-right pr-8">{{ $group->name }}</td>
                <td class="align-top">{{ $group->tags->pluck('name')->join(', ') }}</td>
            </tr>
        @endforeach
    </table>
</div>
</body>
</html>
