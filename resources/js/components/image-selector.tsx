import { Images } from '@/types/models';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function ImageSelector({
    images,
    defaultImageID,
    onValueChange,
}: {
    images: Images;
    defaultImageID?: number;
    onValueChange?: (value: number | null) => void;
}) {
    const [imageID, setImageID] = useState(defaultImageID || null);

    const getSelectedImg = () => images.find((img) => img.id === imageID);

    useEffect(() => {
        onValueChange?.(imageID);
    }, [imageID]);

    const gridItems = images.map((img) => (
        <img className="size-full object-contain" src={img.url} alt={img.alt} onClick={() => setImageID(img.id)} />
    ));
    while (gridItems.length < 4) gridItems.push(<div className="hidden aspect-square size-full border bg-accent/30 lg:block" />);

    return (
        <>
            <div className="m-4 grid auto-rows-min grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="relative col-span-2 row-span-2 text-center">
                    {imageID ? (
                        <div className="relative">
                            <img
                                className="size-full max-h-fit max-w-fit border-2 object-contain"
                                src={getSelectedImg()?.url}
                                alt={getSelectedImg()?.alt}
                            />
                            <div className="absolute top-0 left-0 size-full bg-white/65 opacity-0 hover:opacity-100">
                                <span className="absolute top-1/2 left-1/2 -translate-1/2 text-center *:m-2">
                                    {getSelectedImg()?.alt}
                                    <Button variant="outline" onClick={() => setImageID(null)}>
                                        Clear Selection
                                    </Button>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="aspect-square size-full rounded-xl border-2">
                            <span className="absolute top-1/2 left-1/2 -translate-1/2">No image selected</span>
                        </div>
                    )}
                </div>
                {gridItems}
            </div>
        </>
    );
}
