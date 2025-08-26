export default function Footer() {
    return (
        <>
            <footer className="bg-muted py-8">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="text-sm opacity-80">© 2025 Annika Harmsen. All rights reserved.</p>
                        <div className="mt-4 flex gap-6 md:mt-0">
                            <a href="#intro" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                                Intro
                            </a>
                            <a href="#about" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                                About
                            </a>
                            <a href="#skills" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                                Skills & Experience
                            </a>
                            <a href="#projects" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                                Projects
                            </a>
                            <a href="#contact" className="text-sm opacity-80 transition-opacity hover:opacity-100">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
