import AboutSection from '@/components/about-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import Navigation from '@/components/navigation';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import { Projects } from '@/types/types';

export default function Home({ projects }: { projects: Projects }) {
	return (
		<>
			<Navigation />

			<HeroSection />
			<AboutSection />
			<SkillsSection />
			<ProjectsSection projects={projects} />
			<ContactSection />

			<Footer />
		</>
	);
}
