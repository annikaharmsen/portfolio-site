import FormGridLayout from '@/layouts/form-grid-layout';
import { Form } from '@inertiajs/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { SaveButton } from './app-buttons';
import { Input } from './ui/input';
import { Label } from './ui/label';

const MIN_WIDTH = 720,
    MIN_HEIGHT = 720;

export default function ImageUploadForm() {
    const [imageURL, setImageURL] = useState<string>('');
    useEffect(() => {
        console.log(imageURL);
    });
    const handleImageInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files) {
            const imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (readerEvent) {
                const img = document.createElement('img');
                img.onload = function () {
                    // calculate new dimensions
                    let height, width;
                    const wToHRatio = img.width / img.height;
                    if (wToHRatio > 1) {
                        height = MIN_HEIGHT;
                        width = height * wToHRatio;
                    } else {
                        width = MIN_WIDTH;
                        height = width / wToHRatio;
                    }

                    // create canvas and get context
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

                    // set canvas dimensions
                    canvas.height = height;
                    canvas.width = width;

                    // resize image
                    ctx.drawImage(img, 0, 0, width, height);

                    // save resized image url to state variable
                    const dataurl = canvas.toDataURL(imageFile.type);
                    setImageURL(dataurl);
                };
                img.src = readerEvent.target?.result as string;
            };
            reader.readAsDataURL(imageFile);

            // set file input value to resized image
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(imageFile);
            event.target.files = dataTransfer.files;
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
