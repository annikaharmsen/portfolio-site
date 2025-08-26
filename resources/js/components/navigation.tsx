import { cn } from '@/lib/utils';

export default function Navigation({ mobile = false }: { mobile?: boolean }) {
    const containerClasses = cn(
        'top-0 left-0 z-50 items-center justify-center bg-background',
        mobile ? 'absolute flex h-1/2 w-16 sm:hidden' : 'fixed hidden h-full w-20 sm:flex',
    );

    return (
        <>
            <div className={containerClasses}>
                <nav className="origin-center -rotate-90 transform">
                    <div className="*: flex space-x-8 font-sans text-sm tracking-wider sm:space-x-12">
                        <a
                            href="#contact"
                            className="hover:text-accent-contrast whitespace-nowrap text-secondary-foreground transition-colors duration-300"
                        >
                            CONTACT
                        </a>
                        <a
                            href="#projects"
                            className="hover:text-secondary-contrast whitespace-nowrap text-secondary-foreground transition-colors duration-300"
                        >
                            PROJECTS
                        </a>
                        <a
                            href="#skills"
                            className="hover:text-accent-contrast whitespace-nowrap text-secondary-foreground transition-colors duration-300"
                        >
                            SKILLS
                        </a>
                        <a
                            href="#about"
                            className="hover:text-secondary-contrast whitespace-nowrap text-secondary-foreground transition-colors duration-300"
                        >
                            ABOUT
                        </a>
                        <a
                            href="#intro"
                            className={cn(
                                mobile ? 'hidden' : '',
                                'hover:text-accent-contrast whitespace-nowrap text-secondary-foreground transition-colors duration-300',
                            )}
                        >
                            INTRO
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
}
