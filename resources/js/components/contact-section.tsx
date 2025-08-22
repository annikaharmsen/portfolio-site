import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

export default function ContactSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			subject: formData.get('subject') as string,
			message: formData.get('message') as string
		};

		try {
			const response = await fetch(
				import.meta.env.VITE_CONTACT_API_ENDPOINT,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			);

			if (response.ok) {
				setSubmitStatus('success');
				e.currentTarget.reset();
			} else {
				setSubmitStatus('error');
			}
		} catch {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id='contact' className='py-16 bg-white'>
			<div className='max-w-4xl mx-auto px-6'>
				<h2 className='text-4xl font-fascinate text-center mb-12'>
					Let's Connect
				</h2>
				<div className='grid md:grid-cols-2 gap-12'>
					<div>
						<h3 className='text-2xl font-sans font-semibold mb-6'>
							Get In Touch
						</h3>
						<p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
							I'm actively seeking{' '}
							<strong>
								backend and full-stack development opportunities
							</strong>{' '}
							and would love to discuss how my skills and
							international perspective can contribute to your
							team.
						</p>
						<div className='space-y-4'>
							<div className='flex items-center gap-3 text-terracotta'>
								<Mail className='w-5 h-5' />
								<span>annikat.harmsen1000@gmail.com</span>
							</div>
							<div className='flex items-center gap-3 text-terracotta'>
								<MapPin className='w-5 h-5' />
								<span>
									Available for in-person or hybrid roles in
									the United States of America
								</span>
							</div>
						</div>
						<div className='mt-8 p-4 bg-sage/10 rounded-lg'>
							<p className='text-sm text-muted-foreground italic'>
								"I'm passionate about creating web solutions and
								always excited to take on new challenges. Let's
								build something amazing together!"
							</p>
						</div>
						<div className='flex gap-4 mt-8'>
							<a
								href={import.meta.env.VITE_GITHUB_PROFILE}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button
									variant='outline'
									size='sm'
									className='hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 bg-transparent'
								>
									<Github className='w-4 h-4 mr-2' />
									GitHub
								</Button>
							</a>
							<a
								href={import.meta.env.VITE_LINKEDIN_PROFILE}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Button
									variant='outline'
									size='sm'
									className='hover:bg-terracotta hover:text-white hover:border-terracotta transition-all duration-300 bg-transparent'
								>
									<Linkedin className='w-4 h-4 mr-2' />
									LinkedIn
								</Button>
							</a>
						</div>
					</div>
					<Card className='border-terracotta'>
						<CardHeader>
							<CardTitle className='font-sans'>
								Send a Message
							</CardTitle>
						</CardHeader>
						<CardContent>
							{submitStatus === 'success' && (
								<div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
									Message sent successfully! I'll get back to
									you soon.
								</div>
							)}
							{submitStatus === 'error' && (
								<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
									Failed to send message. Please try again or
									email me directly.
								</div>
							)}
							<form onSubmit={handleSubmit} className='space-y-4'>
								<div>
									<label className='block text-sm font-medium mb-2'>
										Name
									</label>
									<input
										type='text'
										name='name'
										required
										className='w-full px-3 py-2 border border-terracotta rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring'
										placeholder='Your name'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-2'>
										Email
									</label>
									<input
										type='email'
										name='email'
										required
										className='w-full px-3 py-2 border border-terracotta rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring'
										placeholder='your.email@example.com'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-2'>
										Subject
									</label>
									<input
										type='text'
										name='subject'
										className='w-full px-3 py-2 border border-terracotta rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring'
										placeholder='Subject'
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-2'>
										Message
									</label>
									<textarea
										rows={4}
										name='message'
										required
										className='w-full px-3 py-2 border border-terracotta rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring'
										placeholder='Your message...'
									/>
								</div>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='w-full bg-terracotta hover:bg-rust transition-colors duration-300'
								>
									{isSubmitting
										? 'Sending...'
										: 'Send Message'}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
