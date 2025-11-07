import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Mail, MapPin } from 'lucide-react';
import { ReactComponent } from 'node_modules/@inertiajs/react/types/types';
import type React from 'react';
import { useState } from 'react';
import { GitHubButton, LinkedinButton } from '../app-buttons';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const form = event.currentTarget;
        const formData = new FormData(form);
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
                form.reset();
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
        <section id="contact" className="py-16">
            <ContactContentShell
                MainBody={() => (
                    <>
                        <h3 className="mb-6 font-sans text-2xl font-semibold">Get In Touch</h3>
                        <p className="mb-8 text-lg leading-relaxed">
                            I'm actively seeking <strong>backend and full-stack development opportunities</strong> and would love to discuss how my
                            skills and international perspective can contribute to your team.
                        </p>
                    </>
                )}
                Email={() => <span>annikat.harmsen1000@gmail.com</span>}
                Location={() => <span>Available for in-person or hybrid roles in the United States of America</span>}
                Callout={() => (
                    <p className="m-4">
                        "I'm passionate about creating web solutions and always excited to take on new challenges. Let's build something amazing
                        together!"
                    </p>
                )}
                MyGitHubButton={() => (
                    <GitHubButton hoverVariant="accent" href={import.meta.env.VITE_GITHUB_PROFILE}>
                        GitHub
                    </GitHubButton>
                )}
                MyLinkedinButton={() => <LinkedinButton hoverVariant="accent" href={import.meta.env.VITE_LINKEDIN_PROFILE} />}
                FormTitle={() => 'Send me a Message'}
                Form={() => (
                    <>
                        {submitStatus === 'success' && (
                            <div className="dark:emerald-green-400 mb-4 rounded border border-emerald-700 bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="mb-4 rounded border border-red-700 bg-red-50 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-300">
                                Failed to send message. Please try again or email me directly.
                            </div>
                        )}
                        <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                    </>
                )}
            />
        </section>
    );
}

export const ContactContentShell = ({
    MainBody,
    Email,
    Location,
    Callout,
    MyGitHubButton,
    MyLinkedinButton,
    FormTitle,
    Form,
}: {
    MainBody: ReactComponent;
    Email?: ReactComponent;
    Location?: ReactComponent;
    Callout?: ReactComponent;
    MyGitHubButton: ReactComponent;
    MyLinkedinButton: ReactComponent;
    FormTitle: ReactComponent;
    Form: ReactComponent;
}) => (
    <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-12 text-center text-4xl uppercase">Let's Connect</h2>
        <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-y-8">
                <MainBody />

                {(!!Email || !!Location) && (
                    <div className="space-y-4">
                        {!!Email && (
                            <div className="flex items-center gap-3">
                                <Mail className="size-6 min-w-6 text-accent" />
                                <Email />
                            </div>
                        )}
                        {!!Location && (
                            <div className="flex items-center gap-3">
                                <MapPin className="size-6 min-w-6 text-accent" />
                                <Location />
                            </div>
                        )}
                    </div>
                )}
                {!!Callout && (
                    <div className="rounded-lg bg-accent/10 text-sm text-muted-foreground italic">
                        <Callout />
                    </div>
                )}
                <div className="flex gap-4">
                    <MyGitHubButton />
                    <MyLinkedinButton />
                </div>
            </div>
            <Card className="border-accent">
                <CardHeader>
                    <CardTitle>
                        <FormTitle />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form />
                </CardContent>
            </Card>
        </div>
    </div>
);

export const ContactForm = ({
    isSubmitting,
    className,
    disabled = false,
    ...props
}: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & { isSubmitting?: boolean; disabled?: boolean }) => (
    <form {...props} className={cn('space-y-4', className)}>
        <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <Input disabled={disabled} type="text" name="name" required className="border-accent bg-input" placeholder="Your name" />
        </div>
        <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <Input disabled={disabled} type="email" name="email" required className="border-accent bg-input" placeholder="your.email@example.com" />
        </div>
        <div>
            <label className="mb-2 block text-sm font-medium">Subject</label>
            <Input disabled={disabled} type="text" name="subject" className="border-accent bg-input" placeholder="Subject" />
        </div>
        <div>
            <label className="mb-2 block text-sm font-medium">Message</label>
            <Textarea disabled={disabled} rows={4} name="message" required className="border-accent bg-input" placeholder="Your message..." />
        </div>
        <Button
            type="submit"
            disabled={isSubmitting || disabled}
            className="w-full bg-accent text-accent-foreground transition-colors duration-300 hover:bg-foreground"
        >
            {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
    </form>
);
