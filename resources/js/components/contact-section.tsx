import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const response = await fetch(import.meta.env.VITE_CONTACT_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                e.currentTarget.reset();
            } else {
                console.log('not okay');
                setSubmitStatus('error');
            }
        } catch (error) {
            console.log('caught error: ' + error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="bg-white py-16">
            <div className="mx-auto max-w-4xl px-6">
                <h2 className="mb-12 text-center font-fascinate text-4xl">Let's Connect</h2>
                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <h3 className="mb-6 font-sans text-2xl font-semibold">Get In Touch</h3>
                        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                            I'm actively seeking <strong>backend and full-stack development opportunities</strong> and would love to discuss how my
                            skills and international perspective can contribute to your team.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-terracotta">
                                <Mail className="h-5 w-5" />
                                <span>annikat.harmsen1000@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-terracotta">
                                <MapPin className="h-5 w-5" />
                                <span>Available for in-person or hybrid roles in the United States of America</span>
                            </div>
                        </div>
                        <div className="mt-8 rounded-lg bg-sage/10 p-4">
                            <p className="text-sm text-muted-foreground italic">
                                "I'm passionate about creating web solutions and always excited to take on new challenges. Let's build something
                                amazing together!"
                            </p>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <a href={import.meta.env.VITE_GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent transition-all duration-300 hover:border-terracotta hover:bg-terracotta hover:text-white"
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </Button>
                            </a>
                            <a href={import.meta.env.VITE_LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-transparent transition-all duration-300 hover:border-terracotta hover:bg-terracotta hover:text-white"
                                >
                                    <Linkedin className="mr-2 h-4 w-4" />
                                    LinkedIn
                                </Button>
                            </a>
                        </div>
                    </div>
                    <Card className="border-terracotta">
                        <CardHeader>
                            <CardTitle className="font-sans">Send a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {submitStatus === 'success' && (
                                <div className="mb-4 rounded border border-green-400 bg-green-100 p-3 text-green-700">
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
                                    Failed to send message. Please try again or email me directly.
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full rounded-md border border-terracotta bg-input px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full rounded-md border border-terracotta bg-input px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        className="w-full rounded-md border border-terracotta bg-input px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Subject"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">Message</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        required
                                        className="w-full rounded-md border border-terracotta bg-input px-3 py-2 focus:ring-2 focus:ring-ring focus:outline-none"
                                        placeholder="Your message..."
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-terracotta transition-colors duration-300 hover:bg-rust"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
