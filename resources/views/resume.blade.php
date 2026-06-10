{{-- resources/views/resume.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page {
            margin: 72px 72px 72px 72px;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 11pt;
            line-height: 1.3;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: center;
            margin-bottom: 8pt;
        }

        .header .name {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 2pt;
        }

        .header .contact {
            font-size: 10pt;
        }

        .header .contact a {
            color: #1155cc;
            text-decoration: none;
        }

        .section-heading {
            text-align: center;
            font-weight: bold;
            font-size: 11pt;
            margin-top: 10pt;
            margin-bottom: 4pt;
        }

        .summary {
            text-align: left;
            margin-bottom: 4pt;
        }

        .education-entry {
            margin-bottom: 4pt;
        }

        .education-entry .institution {
            font-weight: bold;
        }

        .education-entry .date {
            float: right;
        }

        .skills-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4pt;
        }

        .skills-table td {
            padding: 2pt 0;
            vertical-align: top;
        }

        .skills-table .label {
            font-weight: bold;
            white-space: nowrap;
            padding-right: 8pt;
        }

        .project-entry {
            margin-bottom: 6pt;
        }

        .project-entry .project-title {
            font-weight: bold;
        }

        .project-entry p {
            margin: 2pt 0;
        }

        .experience-entry {
            margin-bottom: 6pt;
        }

        .experience-entry .job-title {
            font-weight: bold;
        }

        .experience-entry p {
            margin: 2pt 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">{{ $resume['name'] }}</div>
        <div class="contact">
            {{ $resume['location'] }} | {{ $resume['phone'] }} |
            <a href="{{ $resume['website'] }}">{{ $resume['website'] }}</a>
        </div>
    </div>

    <div class="section-heading">Professional Summary</div>
    <div class="summary">{{ $resume['summary'] }}</div>

    <div class="section-heading">Education</div>
    @foreach ($resume['educations'] as $edu)
        <div class="education-entry">
            <span class="institution">{{ $edu->institution }}</span>
            <br>
            {{ $edu->title }} – {{ $edu->gpa }} GPA
            <span class="date">{{ $edu->graduation_date->format('F Y') }}</span>
            @if ($edu->bullets)
                <br>
                {{ implode(', ', $edu->bullets) }}
            @endif
        </div>
    @endforeach

    <div class="section-heading">Projects</div>
    @foreach ($resume['projects'] as $project)
        <div class="project-entry">
            <span class="project-title">{{ $project->title }}</span>
            @if ($project->subtitle)
                — {{ $project->subtitle }}
            @endif
            @if ($project->description)
                <p>{{ $project->description }}</p>
            @endif
            @if ($project->bullets)
                @foreach ($project->bullets as $bullet)
                    <p>{{ $bullet }}</p>
                @endforeach
            @endif
        </div>
    @endforeach

    <div class="section-heading">Personal Projects</div>
    @foreach ($resume['personal_projects'] as $project)
        <div class="project-entry">
            <span class="project-title">{{ $project->title }}</span>
            @if ($project->subtitle)
                — {{ $project->subtitle }}
            @endif
            @if ($project->label)
                ({{ $project->label }})
            @endif
            @if ($project->description)
                <p>{{ $project->description }}</p>
            @endif
            @if ($project->bullets)
                @foreach ($project->bullets as $bullet)
                    <p>{{ $bullet }}</p>
                @endforeach
            @endif
        </div>
    @endforeach

    <div class="section-heading">Professional Experience</div>
    @foreach ($resume['experiences'] as $exp)
        <div class="experience-entry">
            <span class="job-title">{{ $exp->title }}</span>
            <br>
            {{ $exp->company }} | {{ $exp->location }}  —  {{ $exp->formatted_date_ranges }}
            @if ($exp->bullets)
                @foreach ($exp->bullets as $bullet)
                    <p>{{ $bullet }}</p>
                @endforeach
            @endif
        </div>
    @endforeach

    <div class="section-heading">Technical Skills</div>
    <table class="skills-table">
        @foreach ($resume['skill_groups'] as $group)
            <tr>
                <td class="label">{{ $group->name }}</td>
                <td>{{ $group->tags->pluck('name')->join(', ') }}</td>
            </tr>
        @endforeach
    </table>
</body>
</html>
