import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Navigation from './navigation';

export default function HeroSection() {
	return (
		<section id='intro' className='h-screen relative overflow-hidden'>
			<Navigation mobile />

			{/* Main Content - Bottom Right */}
			<div className='absolute bottom-8 right-4 sm:bottom-16 sm:right-16 max-w-xs sm:max-w-2xl lg:max-w-4xl text-right px-2'>
				<div>
					<h1 className='text-5xl sm:text-8xl lg:text-9xl font-fascinate text-foreground leading-none'>
						Annika
					</h1>
					<div className='flex justify-end'>
						{/* Mobile SVG - optimized for smaller screens */}
						<svg
							viewBox='0 0 400 80'
							className='h-20 w-auto sm:h-28 lg:hidden'
							xmlns='http://www.w3.org/2000/svg'
						>
							<text
								x='395'
								y='60'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								fontSize='64'
								fontFamily='var(--font-fascinate)'
								style={{ color: 'hsl(var(--primary))' }}
								textAnchor='end'
							>
								HARMSEN
							</text>
						</svg>
						{/* Desktop SVG - optimized for text-9xl (128px) */}
						<svg
							viewBox='0 0 800 160'
							className='h-36 w-auto hidden lg:block'
							xmlns='http://www.w3.org/2000/svg'
						>
							<text
								x='795'
								y='120'
								fill='none'
								stroke='currentColor'
								strokeWidth='3'
								fontSize='128'
								fontFamily='var(--font-fascinate)'
								style={{ color: 'hsl(var(--font-fascinate))' }}
								textAnchor='end'
							>
								HARMSEN
							</text>
						</svg>
					</div>
				</div>

				<p className='text-sm sm:text-md text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-xs sm:max-w-lg ml-auto'>
					<span className='font-bold text-lg sm:text-xl'>
						Full-Stack Developer | Backend Specialist
					</span>
					<br />I develop full-stack web applications and robust APIs
					using Laravel and React, bringing strong problem-solving
					skills and a continuous learning mindset to every project.
				</p>

				<div className='flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-end'>
					<a href='#projects'>
						<Button
							size='lg'
							className='bg-primary hover:bg-terracotta transition-colors duration-300'
						>
							View My Work
						</Button>
					</a>
					<a
						href={import.meta.env.VITE_RESUME_PATH}
						download={import.meta.env.VITE_RESUME_FILENAME}
					>
						<Button
							variant='outline'
							size='lg'
							className='border-primary hover:bg-sage hover:text-white hover:border-sage bg-transparent transition-all duration-300'
						>
							<Download className='w-4 h-4 mr-2' />
							Download Resume
						</Button>
					</a>
				</div>
			</div>
		</section>
	);
}
