import CenteredContent from '@/components/centered-content';
import ImageSelector from '@/components/image-selector';
import ImageUploadForm from '@/components/image-upload-form';
import { Button } from '@/components/ui/button';
import useReroute from '@/hooks/use-reroute';
import useSessionStorage from '@/hooks/use-session-storage';
import { Image, Images } from '@/types/models';

export default function ImagesIndex({ images, default_image_id }: { images: Images; default_image_id?: number }) {
    const getImage = (image_id?: number) => images.find((image) => image.id === image_id) || null;

    const [, setSelectedImage] = useSessionStorage<Image | null>(`selectedImage`, getImage(default_image_id));

    const reroute = useReroute('images');

    return (
        <CenteredContent className="flex flex-col justify-evenly">
            <div className="m-4 grid md:grid-cols-[33%_67%]">
                <ImageUploadForm />
                <ImageSelector images={images} defaultImageID={default_image_id} onValueChange={(image_id) => setSelectedImage(getImage(image_id))} />
            </div>
            <Button onClick={reroute.reroute}>Done</Button>
        </CenteredContent>
    );
}
