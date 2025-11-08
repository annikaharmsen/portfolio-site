import { GitHubButton, LinkedinButton } from '@/components/app-buttons';
import { ContactTexts } from '@/types/site-texts';
import { SiteTextInput, SiteTextTextarea } from '../../pages/admin/sections/edit';
import ContactShell, { ContactForm } from '../contact-shell';

export default function EditContact({ texts = {} }: { texts?: ContactTexts }) {
    return (
        <ContactShell
            MainBody={() => (
                <>
                    <SiteTextTextarea
                        name="contact.main"
                        defaultValue={texts.main || ''}
                        placeholder={`Enter "contact me" body`}
                        className="grow text-sm"
                    />
                </>
            )}
            Email={() => <SiteTextInput type="email" name="contact.email" defaultValue={texts.email || ''} placeholder="Enter email address" />}
            Location={() => (
                <SiteTextTextarea name="contact.location" defaultValue={texts.location || ''} placeholder="Share where you would like to work" />
            )}
            Callout={() => (
                <SiteTextTextarea name="contact.callout" defaultValue={texts.callout || ''} placeholder="Write a final note to the viewer" />
            )}
            MyGitHubButton={GitHubButton}
            MyLinkedinButton={LinkedinButton}
            Form={() => <ContactForm disabled />}
        />
    );
}
