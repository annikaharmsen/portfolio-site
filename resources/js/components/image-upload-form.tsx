import FormGridLayout from '@/layouts/form-grid-layout';
import { resizeImage, toFileList } from '@/lib/utils';
import { Form } from '@inertiajs/react';
import { ChangeEventHandler, useState } from 'react';
import { SaveButton } from './app-buttons';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ImageUploadForm() {
    const [imageURL, setImageURL] = useState<string>('');
    const handleImageInput: ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (event.target.files) {
            const imageFile = event.target.files[0];

            const { file: resizedImage, dataUrl } = await resizeImage(imageFile, 720, 720);

            setImageURL(dataUrl);

            event.target.files = toFileList(resizedImage);
        }
    };

    return (
        <Form className="m-4 flex h-full flex-col items-center justify-center" action="/images" method="post">
            {({ processing, isDirty }) => (
                <FormGridLayout className="max-w-100 grid-cols-1!">
                    <>
                        <Label htmlFor="image">Upload new image</Label>
                        <Input name="image" type="file" onChange={handleImageInput} />
                    </>
                    <>{imageURL && <img src={imageURL} />}</>
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
