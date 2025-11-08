import Footer from '@/components/portfolio/footer';
import Navigation from '@/components/portfolio/navigation';
import ProjectsSection from '@/components/portfolio/projects-section';
import TechSkillsSection from '@/components/portfolio/tech-skills-section';
import AboutSection from '@/components/sections/show-about';
import ShowContact from '@/components/sections/show-contact';
import ShowIntro from '@/components/sections/show-intro';
import AboveTheFold from '@/layouts/above-the-fold';
import { Projects, Tags } from '@/types/models';
import { SiteTexts } from '@/types/site-texts';

export default function Portfolio({ texts, tags, projects }: { texts: SiteTexts; tags: Tags; projects: Projects }) {
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
                    <AboutSection texts={texts.about || {}} />
                </section>
                <TechSkillsSection tags={tags} />
                {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
                <ShowContact texts={texts.contact || {}} />

                <Footer />
            </main>
        </>
    );
}
