import Footer from '@/components/portfolio/footer';
import Navigation from '@/components/portfolio/navigation';
import ProfessionalExperienceSection from '@/components/sections/professional-experience-section';
import ProjectsSection from '@/components/sections/projects-section';
import AboutSection from '@/components/sections/show-about';
import ShowContact from '@/components/sections/show-contact';
import ShowIntro from '@/components/sections/show-intro';
import TechSkillsSection from '@/components/sections/tech-skills-section';
import AboveTheFold from '@/layouts/above-the-fold';
import { Educations, Experiences, Projects, SkillGroups } from '@/types/models';
import { SiteTexts } from '@/types/site-texts';

export default function Portfolio({ texts, skillGroups, projects, experiences, educations }: { texts: SiteTexts; skillGroups: SkillGroups; projects: Projects; experiences: Experiences; educations?: Educations }) {
    return (
        <>
            <Navigation />
            <main className="md:ml-20">
                <AboveTheFold>
                    <Navigation mobile hide="intro" />
                    <div className="absolute right-4 bottom-8 max-w-xs sm:right-16 sm:bottom-16 sm:max-w-2xl lg:max-w-4xl">
                        <ShowIntro texts={texts.intro || {}} />
                    </div>
                </AboveTheFold>

                <section id="about" className="bg-muted py-16">
                    <AboutSection texts={texts.about || {}} educations={educations} />
                </section>
                <TechSkillsSection skillGroups={skillGroups} />
                {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
                {experiences && experiences.length > 0 && <ProfessionalExperienceSection experiences={experiences} />}
                <ShowContact texts={texts.contact || {}} />

                <Footer />
            </main>
        </>
    );
}
