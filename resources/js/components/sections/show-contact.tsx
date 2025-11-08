import { ContactTexts } from '@/types/site-texts';
import type React from 'react';
import { useState } from 'react';
import { GitHubButton, LinkedinButton } from '../app-buttons';
import ContactShell, { ContactForm } from '../contact-shell';
import Markdown from '../markdown';

export default function ShowContact({ texts }: { texts: ContactTexts }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    console.log(texts);

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
            <ContactShell
                MainBody={() => <Markdown>{texts.main}</Markdown>}
                Email={() => <span>{texts.email}</span>}
                Location={() => <span>{texts.location}</span>}
                Callout={() => <Markdown className="m-4">{texts.callout}</Markdown>}
                MyGitHubButton={() => (
                    <GitHubButton hoverVariant="accent" href={import.meta.env.VITE_GITHUB_PROFILE}>
                        GitHub
                    </GitHubButton>
                )}
                MyLinkedinButton={() => <LinkedinButton hoverVariant="accent" href={import.meta.env.VITE_LINKEDIN_PROFILE} />}
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
