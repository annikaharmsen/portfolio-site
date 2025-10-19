import AboutSection from '@/components/portfolio/about-section';
import ContactSection from '@/components/portfolio/contact-section';
import Footer from '@/components/portfolio/footer';
import HeaderContent from '@/components/portfolio/header-content';
import Navigation from '@/components/portfolio/navigation';
import ProjectsSection from '@/components/portfolio/projects-section';
import TechSkillsSection from '@/components/portfolio/tech-skills-section';
import AboveTheFold from '@/layouts/above-the-fold';
import { Projects, Tags } from '@/types/models';

export default function Portfolio({ tags, projects }: { tags: Tags; projects: Projects }) {
    return (
        <>
            <Navigation />
            <main className="md:ml-20">
                <AboveTheFold>
                    <Navigation mobile hide="intro" />
                    <HeaderContent />
                </AboveTheFold>

                <AboutSection />
                <TechSkillsSection tags={tags} />
                {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
                <ContactSection />

                <Footer />
            </main>
        </>
    );
}
