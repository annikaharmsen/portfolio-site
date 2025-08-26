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
                        <a href="#contact" className="whitespace-nowrap text-foreground transition-colors duration-300 hover:text-accent">
                            CONTACT
                        </a>
                        <a href="#projects" className="whitespace-nowrap text-foreground transition-colors duration-300 hover:text-secondary">
                            PROJECTS
                        </a>
                        <a href="#skills" className="whitespace-nowrap text-foreground transition-colors duration-300 hover:text-accent">
                            SKILLS
                        </a>
                        <a href="#about" className="whitespace-nowrap text-foreground transition-colors duration-300 hover:text-secondary">
                            ABOUT
                        </a>
                        <a
                            href="#intro"
                            className={cn(
                                mobile ? 'hidden' : '',
                                'whitespace-nowrap text-foreground transition-colors duration-300 hover:text-accent',
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
