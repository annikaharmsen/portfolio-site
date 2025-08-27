import { ReactNode } from 'react';

export default function AboveTheFold({ children }: { children: ReactNode }) {
    return (
        <section id="intro" className="relative h-screen overflow-hidden">
            {children}
        </section>
    );
}
