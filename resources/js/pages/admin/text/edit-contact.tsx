import { GitHubButton, LinkedinButton } from '@/components/app-buttons';
import { ContactContentShell, ContactForm } from '@/components/portfolio/contact-section';
import { SiteTextSlot } from '@/types/models';
import { SiteTextInput, SiteTextTextarea } from './edit';

export default function EditContact({ texts = {} }: { texts?: SiteTextSlot }) {
    return (
        <ContactContentShell
            MainBody={() => (
                <>
                    <SiteTextTextarea
                        name="contact.main"
                        defaultValue={(texts.main as string) || ''}
                        placeholder={`Enter "contact me" body`}
                        className="grow text-sm"
                    />
                </>
            )}
            Email={() => (
                <SiteTextInput type="email" name="contact.email" defaultValue={(texts.email as string) || ''} placeholder="Enter email address" />
            )}
            Location={() => (
                <SiteTextTextarea
                    name="contact.location"
                    defaultValue={(texts.location as string) || ''}
                    placeholder="Share where you would like to work"
                />
            )}
            Callout={() => (
                <SiteTextTextarea
                    name="contact.callout"
                    defaultValue={(texts.callout as string) || ''}
                    placeholder="Write a final note to the viewer"
                />
            )}
            MyGitHubButton={GitHubButton}
            MyLinkedinButton={LinkedinButton}
            FormTitle={() => (
                <SiteTextInput name="contact.form_title" defaultValue={(texts.form_title as string) || ''} placeholder="Title the contact form" />
            )}
            Form={() => <ContactForm disabled />}
        />
    );
}
