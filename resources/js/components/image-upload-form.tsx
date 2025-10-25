import FormGridLayout from '@/layouts/form-grid-layout';
import { Form } from '@inertiajs/react';
import { SaveButton } from './app-buttons';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ImageUploadForm() {
    return (
        <Form className="m-4 flex h-full flex-col items-center justify-center" action="/images" method="post">
            {({ processing, isDirty }) => (
                <FormGridLayout className="max-w-100 grid-cols-1!">
                    <>
                        <Label htmlFor="image">Upload new image</Label>
                        <Input name="image" type="file" />
                    </>
                    <>
                        <Label htmlFor="alt">Add alt text</Label>
                        <Input name="alt" type="text" />
                    </>
                    <SaveButton className="mx-auto" disabled={processing || !isDirty}>
                        {processing ? 'Uploading...' : 'Upload'}
                    </SaveButton>
                </FormGridLayout>
            )}
        </Form>
    );
}
