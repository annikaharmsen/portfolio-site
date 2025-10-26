import { CancelButton, SaveButton } from '@/components/app-buttons';
import CenteredContent from '@/components/centered-content';
import { H1, H2Classes } from '@/components/headings';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TextAreaStyles } from '@/components/ui/textarea';
import useController from '@/hooks/use-controller';
import useReroute from '@/hooks/use-reroute';
import { cn } from '@/lib/utils';
import { Image, Project } from '@/types/models';
import { router, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface EditHeroSectionsProps {
    project: Project;
}

type DraftHeroSection = {
    id?: number;
    image?: Image;
    index: number;
    heading?: string;
    text?: string;
};

type FormDataHeroSection = {
    id?: number;
    image_id?: number;
    index: number;
    heading?: string;
    text?: string;
};

export default function EditHeroSections({ project }: EditHeroSectionsProps) {
    // initialize data - saved state/project data
    const getInitialSectionData = (): DraftHeroSection[] => {
        const selectedImage = sessionStorage.getItem('selectedImage');
        const sectionIndex = sessionStorage.getItem('editingSectionIndex');
        const savedFormData = sessionStorage.getItem('heroSectionsFormData');

        if (selectedImage && sectionIndex && savedFormData) {
            // restore from sessionStorage and update with selected image
            const newImage = JSON.parse(selectedImage);
            const restoredSections = JSON.parse(savedFormData);
            restoredSections[parseInt(sectionIndex)].image = newImage;

            // clean up sessionStorage
            sessionStorage.removeItem('selectedImage');
            sessionStorage.removeItem('editingSectionIndex');
            sessionStorage.removeItem('heroSectionsFormData');

            return restoredSections;
        }

        // normal initialization from project data
        return (
            project.hero_sections?.map((section) => ({
                id: section.id,
                image: section.image,
                index: section.index,
                heading: section.heading,
                text: section.text,
            })) || []
        );
    };

    const [draftSections, setDraftSections] = useState<DraftHeroSection[]>(getInitialSectionData());

    const mapDraftToFormData = (): FormDataHeroSection[] => {
        return draftSections.map((section) => ({ ...section, image_id: section.image?.id }));
    };

    const { data, setData, processing, errors, put } = useForm({
        hero_sections: mapDraftToFormData(),
    });

    // section manipulation
    const addSection = () => {
        setDraftSections([...draftSections, { index: draftSections.length }]);
        setData('hero_sections', [...data.hero_sections, { index: data.hero_sections.length }]);
    };
    const updateSectionData = (index: number, field: keyof (DraftHeroSection | FormDataHeroSection), value: string | number) => {
        const updatedSections = [...draftSections];
        updatedSections[index] = { ...updatedSections[index], [field]: value };
        setDraftSections(updatedSections);
    };
    // sync form data to draft sections
    useEffect(() => {
        setData('hero_sections', mapDraftToFormData());
    }, [draftSections]);

    // routing utilities
    const controller = useController(`/projects/${project.id}/hero-sections`);
    const reroute = useReroute();

    // image selection
    const handleImageSelect = (sectionIndex: number, imageID?: number) => {
        // Store current form state before navigating
        sessionStorage.setItem('editingSectionIndex', sectionIndex.toString());
        sessionStorage.setItem('heroSectionsFormData', JSON.stringify(data.hero_sections));

        if (imageID) router.put(`/images/${imageID}`);
        else router.get('/images');
    };

    // hero section form component
    const HeroSectionFieldset = ({ section }: { section: DraftHeroSection }) => {
        const sectionErrors = {
            image_id: errors[`hero_sections.${section.index}.image_id`],
            heading: errors[`hero_sections.${section.index}.heading`],
            text: errors[`hero_sections.${section.index}.text`],
        };
        return (
            <fieldset
                className={cn('flex w-full items-center justify-around gap-8 border-y-1 py-8 md:px-24', section.index % 2 == 1 && 'flex-row-reverse')}
            >
                <>
                    <Button
                        type="button"
                        onClick={() => handleImageSelect(section.index)}
                        className="relative max-h-full min-h-50 rounded-2xl border p-0 hover:scale-101 hover:bg-accent"
                    >
                        {section.image ? (
                            <>
                                <img src={section.image.url} alt="" className="size-full rounded-2xl object-contain" />
                                <div className="absolute top-0 left-0 size-full rounded-2xl bg-primary/65 opacity-0 hover:opacity-100">
                                    <span className="absolute top-1/2 left-1/2 -translate-1/2 text-center *:m-2">Click to change</span>
                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs *:m-2">{section.image.alt}</span>
                                </div>
                            </>
                        ) : (
                            <div className="aspect-square size-full">
                                <Plus className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        )}
                    </Button>
                    <InputError>{sectionErrors.image_id}</InputError>
                </>
                <article className="w-full">
                    <Input
                        name="heading"
                        type="text"
                        className={cn(H2Classes, 'text-2xl!', section.heading && 'border-none text-foreground shadow-none')}
                        defaultValue={section.heading}
                        onBlur={(e) => updateSectionData(section.index, 'heading', e.target.value)}
                        placeholder="Enter Heading"
                    />
                    <InputError>{sectionErrors.heading}</InputError>
                    <TextareaAutosize
                        name="text"
                        className={cn(TextAreaStyles, 'min-h-15 resize-none', section.text && 'border-none text-foreground shadow-none')}
                        defaultValue={section.text}
                        onBlur={(e) => updateSectionData(section.index, 'text', e.target.value)}
                        placeholder="add text here"
                    />
                    <InputError>{sectionErrors.text}</InputError>
                </article>
            </fieldset>
        );
    };

    return (
        <CenteredContent>
            <H1>{project.title}</H1>
            <span>{project.subtitle}</span>
            <hr className="my-12" />
            {!!data.hero_sections.length && (
                <form className="w-full max-w-250">
                    {data.hero_sections.map((section) => (
                        <HeroSectionFieldset section={section} />
                    ))}
                    <div className="my-12 flex w-full justify-end gap-4">
                        <CancelButton onClick={reroute.reroute} />
                        <SaveButton onClick={() => controller.update(put)} disabled={processing} />
                    </div>
                </form>
            )}
            <Button variant="outline" onClick={addSection}>
                Add Section
            </Button>
        </CenteredContent>
    );
}
