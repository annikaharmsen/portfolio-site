import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function HeaderContent() {
    return (
        <div className="absolute right-4 bottom-8 max-w-xs px-2 text-right sm:right-16 sm:bottom-16 sm:max-w-2xl lg:max-w-4xl">
            <div>
                <h1 className="font-fascinate text-5xl leading-none text-primary sm:text-8xl lg:text-9xl">Annika</h1>
                <div className="flex justify-end text-primary">
                    {/* Mobile SVG - optimized for smaller screens */}
                    <svg viewBox="0 0 400 80" className="h-20 w-auto sm:h-28 lg:hidden" xmlns="http://www.w3.org/2000/svg">
                        <text
                            x="395"
                            y="60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            fontSize="64"
                            fontFamily="var(--font-fascinate)"
                            style={{ color: 'hsl(var(--primary))' }}
                            textAnchor="end"
                        >
                            HARMSEN
                        </text>
                    </svg>
                    {/* Desktop SVG - optimized for text-9xl (128px) */}
                    <svg viewBox="0 0 800 160" className="hidden h-36 w-auto lg:block" xmlns="http://www.w3.org/2000/svg">
                        <text
                            x="795"
                            y="120"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            fontSize="128"
                            fontFamily="var(--font-fascinate)"
                            style={{ color: 'hsl(var(--primary))' }}
                            textAnchor="end"
                        >
                            HARMSEN
                        </text>
                    </svg>
                </div>
            </div>

            <p className="sm:text-md mb-6 ml-auto max-w-xs text-sm leading-relaxed text-foreground sm:mb-8 sm:max-w-lg">
                <span className="text-lg font-bold sm:text-xl">Full-Stack Developer | Backend Specialist</span>
                <br />I develop full-stack web applications and robust APIs using Laravel and React, bringing strong problem-solving skills and a
                continuous learning mindset to every project.
            </p>

            <div className="flex flex-col flex-wrap justify-end gap-3 sm:flex-row sm:gap-4">
                <a href="#projects">
                    <Button size="lg" className="bg-primary transition-colors duration-300 hover:bg-accent hover:text-accent-foreground">
                        View My Work
                    </Button>
                </a>
                <a href={import.meta.env.VITE_RESUME_PATH} download={import.meta.env.VITE_RESUME_FILENAME}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-primary bg-transparent transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                    </Button>
                </a>
            </div>
        </div>
    );
}
