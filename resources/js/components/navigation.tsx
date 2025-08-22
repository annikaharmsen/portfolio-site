import { cn } from '@/lib/utils';

export default function Navigation({ mobile = false }: { mobile?: boolean }) {
	const containerClasses = cn(
		'left-0 top-0 items-center justify-center z-50 bg-white',
		mobile
			? 'absolute h-1/2 w-16 flex sm:hidden'
			: 'fixed h-full w-20 hidden sm:flex'
	);

	return (
		<>
			<div className={containerClasses}>
				<nav className='transform -rotate-90 origin-center'>
					<div className='flex space-x-8 sm:space-x-12 text-sm font-sans tracking-wider'>
						<a
							href='#contact'
							className='text-muted-foreground hover:text-terracotta transition-colors duration-300 whitespace-nowrap'
						>
							CONTACT
						</a>
						<a
							href='#projects'
							className='text-muted-foreground hover:text-sage transition-colors duration-300 whitespace-nowrap'
						>
							PROJECTS
						</a>
						<a
							href='#skills'
							className='text-muted-foreground hover:text-terracotta transition-colors duration-300 whitespace-nowrap'
						>
							SKILLS
						</a>
						<a
							href='#about'
							className='text-muted-foreground hover:text-sage transition-colors duration-300 whitespace-nowrap'
						>
							ABOUT
						</a>
						<a
							href='#intro'
							className={cn(
								mobile ? 'hidden' : '',
								'text-muted-foreground hover:text-terracotta transition-colors duration-300 whitespace-nowrap'
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
