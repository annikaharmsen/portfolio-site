import { cn } from '@/lib/utils';

export default function Navigation({ mobile = false, hide = [] }: { mobile?: boolean; hide?: string | Array<string> }) {
    const containerClasses = cn(
        'top-0 left-0 z-50 items-center justify-center bg-background',
        mobile ? 'absolute flex h-1/2 w-16 sm:hidden' : 'fixed hidden h-full w-20 sm:flex',
    );

    const NavLink = ({ link, hover_color }: { link: string; hover_color: string }) => (
        <a
            href={'#' + link.toLowerCase()}
            className={cn('whitespace-nowrap text-foreground transition-colors duration-300', 'hover:text-' + hover_color)}
        >
            {link.toUpperCase()}
        </a>
    );

    const links = ['intro', 'about', 'skills', 'projects', 'contact'].filter((link) => !hide.includes(link)).reverse();

    return (
        <>
            <div className={containerClasses}>
                <nav className="origin-center -rotate-90 transform">
                    <div className="*: flex space-x-8 font-sans text-sm tracking-wider sm:space-x-12">
                        {links.map((link) => {
                            const hover_color = links.indexOf(link) % 2 ? 'accent' : 'secondary';
                            return <NavLink link={link} hover_color={hover_color} />;
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
}
