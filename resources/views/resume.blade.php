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
            border-bottom: none;
        }

        .summary {
            text-align: left;
            margin-bottom: 4pt;
        }

        .education-entry {
            margin-bottom: 4pt;
        }

        .education-entry .degree {
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

        .project-entry .project-status {
            font-weight: bold;
        }

        .project-entry .tech-stack {
            font-size: 11pt;
        }

        .experience-entry {
            margin-bottom: 6pt;
        }

        .experience-entry .job-title {
            font-weight: bold;
        }

        ul {
            margin: 2pt 0 4pt 18pt;
            padding: 0;
        }

        li {
            margin-bottom: 1pt;
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
            <span class="degree">{{ $edu->degree }} (GPA: {{ $edu->gpa }})</span>
            <span class="date">{{ $edu->graduation_date->format('F Y') }}</span>
            <br>
            {{ $edu->institution }}
            @if ($edu->honors)
                <ul>
                    @foreach ($edu->honors as $honor)
                        <li>{{ $honor }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    @endforeach

    <div class="section-heading">Technical Skills</div>
    <table class="skills-table">
        @foreach ($resume['skill_groups'] as $group)
            <tr>
                <td class="label">{{ $group->name }}</td>
                <td>{{ $group->skills }}</td>
            </tr>
        @endforeach
    </table>

    <div class="section-heading">Projects</div>
    @foreach ($resume['projects'] as $project)
        <div class="project-entry">
            <span class="project-title">{{ $project->title }}</span>
            @if ($project->resume_tech_stack)
                <span class="project-status"> (In Progress)</span>
            @endif
            <br>
            {{ $project->resume_description }}
            @if ($project->resume_tech_stack)
                <br>
                <span class="tech-stack">({{ $project->resume_tech_stack }})</span>
            @endif
            @if ($project->resume_bullets)
                <ul>
                    @foreach ($project->resume_bullets as $bullet)
                        <li>{{ $bullet }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    @endforeach

    <div class="section-heading">Professional Experience</div>
    @foreach ($resume['experiences'] as $exp)
        <div class="experience-entry">
            <span class="job-title">{{ $exp->title }}</span>
            <br>
            {{ $exp->company }} | {{ $exp->location }}
            <br>
            {{ $exp->start_date->format('m/Y') }} - {{ $exp->end_date ? $exp->end_date->format('m/Y') : 'Present' }}
            @if ($exp->resume_bullets)
                <ul>
                    @foreach ($exp->resume_bullets as $bullet)
                        <li>{{ $bullet }}</li>
                    @endforeach
                </ul>
            @endif
        </div>
    @endforeach
</body>
</html>
