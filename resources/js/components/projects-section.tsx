import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ExternalLink,
	Github,
	PawPrint,
	Camera,
	Database,
	Shield,
	Users,
	Code
} from 'lucide-react';

export default function ProjectsSection() {
	return (
		<section id='projects' className='py-16 bg-sage/60'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6'>
				<h2 className='text-4xl font-fascinate text-center mb-12 text-white'>
					Featured Projects
				</h2>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
					<a
						href={import.meta.env.VITE_PAWSH_DEMO}
						target='_blank'
						rel='noopener noreferrer'
					>
						<Card className='group hover:shadow-lg transition-shadow bg-white border-sage'>
							<CardHeader className='pb-4'>
								<div className='flex items-start justify-between'>
									<div className='flex items-center gap-3'>
										<div className='p-2 bg-terracotta/10 rounded-lg'>
											<PawPrint className='w-6 h-6 text-rust' />
										</div>
										<div>
											<CardTitle className='font-sans text-lg mb-1 '>
												Pawsh E-Commerce
											</CardTitle>
											<CardDescription className='text-sm'>
												Full-Stack Pet Shop Platform
												(Capstone)
											</CardDescription>
										</div>
									</div>
									<ExternalLink className='w-5 h-5 text-muted-foreground group-hover:text-terracotta transition-colors' />
								</div>
							</CardHeader>
							<CardContent className='space-y-4 mx-6'>
								<p className='text-muted-foreground leading-relaxed'>
									A comprehensive e-commerce solution for a
									pet shop, featuring complete user
									authentication, shopping cart functionality,
									and secure payment processing. Led backend
									development using Laravel framework.
								</p>

								<div className='grid grid-cols-2 gap-4'>
									<div className='flex items-center gap-2 text-sm'>
										<Users className='w-4 h-4 text-sage' />
										<span>Team Leadership</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Database className='w-4 h-4 text-sage' />
										<span>Database Design</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Shield className='w-4 h-4 text-sage' />
										<span>Secure Payments</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Code className='w-4 h-4 text-sage' />
										<span>Admin Panel</span>
									</div>
								</div>

								<div className='flex flex-wrap gap-2'>
									<Badge className='bg-sage text-white'>
										Laravel
									</Badge>
									<Badge className='bg-sage text-white'>
										PostgreSQL
									</Badge>
									<Badge className='bg-sage text-white'>
										Stripe API
									</Badge>
									<Badge className='bg-sage text-white'>
										Team Leadership
									</Badge>
								</div>

								<div className='flex flex-col sm:flex-row gap-2 pt-2'>
									<a
										href={import.meta.env.VITE_PAWSH_REPO}
										target='_blank'
										rel='noopener noreferrer'
									>
										<Button
											variant='outline'
											size='sm'
											className='hover:bg-sage hover:text-white hover:border-sage transition-all duration-300 bg-transparent'
										>
											<Github className='w-4 h-4 mr-2' />
											View Code
										</Button>
									</a>
									<a
										href={import.meta.env.VITE_PAWSH_DEMO}
										target='_blank'
										rel='noopener noreferrer'
									>
										<Button
											variant='outline'
											size='sm'
											className='hover:bg-rust hover:border-rust hover:text-white border-primary transition-all duration-300 bg-transparent'
										>
											<ExternalLink className='w-4 h-4 mr-2' />
											Live Demo
										</Button>
									</a>
								</div>
							</CardContent>
						</Card>
					</a>
					<a href='#' target='_blank' rel='noopener noreferrer'>
						<Card className='group hover:shadow-lg transition-shadow bg-white border-sage'>
							<CardHeader className='pb-4'>
								<div className='flex items-start justify-between'>
									<div className='flex items-center gap-3'>
										<div className='p-2 bg-rust/10 rounded-lg'>
											<Camera className='w-6 h-6 text-rust' />
										</div>
										<div>
											<CardTitle className='font-sans text-lg mb-1'>
												Photography Studio Backend
											</CardTitle>
											<CardDescription className='text-sm'>
												Custom PHP Backend System
											</CardDescription>
										</div>
									</div>
									<ExternalLink className='w-5 h-5 text-muted-foreground group-hover:text-rust transition-colors' />
								</div>
							</CardHeader>
							<CardContent className='space-y-4 mx-6'>
								<p className='text-muted-foreground leading-relaxed'>
									Built from scratch using vanilla PHP to
									learn fundamental backend development skills
									without framework dependencies. Features
									complete CRUD operations and custom
									authentication system.
								</p>

								<div className='grid grid-cols-2 gap-4'>
									<div className='flex items-center gap-2 text-sm'>
										<Shield className='w-4 h-4 text-sage' />
										<span>Custom Auth</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Code className='w-4 h-4 text-sage' />
										<span>Custom Router</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<Database className='w-4 h-4 text-sage' />
										<span>SQL Security</span>
									</div>
									<div className='flex items-center gap-2 text-sm'>
										<ExternalLink className='w-4 h-4 text-sage' />
										<span>Error Handling</span>
									</div>
								</div>

								<div className='flex flex-wrap gap-2'>
									<Badge className='bg-sage text-white'>
										Vanilla PHP
									</Badge>
									<Badge className='bg-sage text-white'>
										MySQL
									</Badge>
									<Badge className='bg-sage text-white'>
										Stripe API
									</Badge>
									<Badge className='bg-sage text-white'>
										Custom Auth
									</Badge>
								</div>

								<div className='flex flex-col sm:flex-row gap-2 pt-2'>
									<a
										href={
											import.meta.env.VITE_PHOTOVIEW_REPO
										}
										target='_blank'
										rel='noopener noreferrer'
									>
										<Button
											variant='outline'
											size='sm'
											className='hover:bg-sage hover:text-white hover:border-sage transition-all duration-300 bg-transparent'
										>
											<Github className='w-4 h-4 mr-2' />
											View Code
										</Button>
									</a>
								</div>
							</CardContent>
						</Card>
					</a>
				</div>
			</div>
		</section>
	);
}
