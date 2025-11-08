import { cn } from '@/lib/utils';
import { Mail, MapPin } from 'lucide-react';
import { ReactComponent } from 'node_modules/@inertiajs/react/types/types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export default function ContactShell({
    MainBody,
    Email,
    Location,
    Callout,
    MyGitHubButton,
    MyLinkedinButton,
    Form,
}: {
    MainBody: ReactComponent;
    Email?: ReactComponent;
    Location?: ReactComponent;
    Callout?: ReactComponent;
    MyGitHubButton: ReactComponent;
    MyLinkedinButton: ReactComponent;
    Form: ReactComponent;
}) {
    return (
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
                        <CardTitle>Send me a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

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
