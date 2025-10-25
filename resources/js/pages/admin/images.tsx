import CenteredContent from '@/components/centered-content';
import ImageSelector from '@/components/image-selector';
import ImageUploadForm from '@/components/image-upload-form';
import { Button } from '@/components/ui/button';
import { Images } from '@/types/models';
import { useState } from 'react';

export default function ImagesIndex({ images, default_image_id }: { images: Images; default_image_id?: number }) {
    const [selectedImageId, setSelectedImageId] = useState<number | null>(default_image_id || null);

    const handleDone = () => {
        if (selectedImageId) {
            const selectedImage = images.find((img) => img.id === selectedImageId);
            sessionStorage.setItem('selectedImage', JSON.stringify(selectedImage));
        }
        history.back();
    };

    return (
        <CenteredContent className="flex flex-col justify-evenly">
            <div className="m-4 grid md:grid-cols-[33%_67%]">
                <ImageUploadForm />
                <ImageSelector images={images} defaultImageID={default_image_id} onValueChange={setSelectedImageId} />
            </div>
            <Button onClick={handleDone}>Done</Button>
        </CenteredContent>
    );
}
