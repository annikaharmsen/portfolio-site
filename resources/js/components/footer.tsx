export default function Footer() {
	return (
		<>
			<footer className='bg-primary text-primary-foreground py-8'>
				<div className='max-w-6xl mx-auto px-6'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<p className='text-sm opacity-80'>
							© 2025 Annika Harmsen. All rights reserved.
						</p>
						<div className='flex gap-6 mt-4 md:mt-0'>
							<a
								href='#intro'
								className='text-sm opacity-80 hover:opacity-100 transition-opacity'
							>
								Intro
							</a>
							<a
								href='#about'
								className='text-sm opacity-80 hover:opacity-100 transition-opacity'
							>
								About
							</a>
							<a
								href='#skills'
								className='text-sm opacity-80 hover:opacity-100 transition-opacity'
							>
								Skills & Experience
							</a>
							<a
								href='#projects'
								className='text-sm opacity-80 hover:opacity-100 transition-opacity'
							>
								Projects
							</a>
							<a
								href='#contact'
								className='text-sm opacity-80 hover:opacity-100 transition-opacity'
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
