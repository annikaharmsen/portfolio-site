import { CancelButton, SaveButton } from '@/components/app-buttons';
import CenteredContent from '@/components/centered-content';
import { H1, H2Classes } from '@/components/headings';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { textAreaStyles } from '@/components/ui/textarea';
import useReroute from '@/hooks/use-reroute';
import useSessionStorage from '@/hooks/use-session-storage';
import useUnsavedWarning from '@/hooks/use-unsaved-warning';
import { cn } from '@/lib/utils';
import { Image, Project } from '@/types/models';
import { Form, Head, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface EditHeroSectionsProps {
    project: Project;
}

type DraftHeroSection = {
    id?: number;
    image?: Image;
    heading?: string;
    text?: string;
};

export default function EditHeroSections({ project }: EditHeroSectionsProps) {
    // session storage variables
    const [selectedImage, setSelectedImage] = useSessionStorage<Image | null>(`selectedImage`, null);
    const [imageSectionIndex, setImageSectionIndex] = useSessionStorage<number | null>(`imageSectionIndex/${project.id}`, null);
    const [savedHeroSections, setSavedHeroSections] = useSessionStorage<DraftHeroSection[]>(`heroSections/${project.id}`, []);

    const [allowNavigate, setAllowNavigate] = useState<boolean>(false);

    // initialize data - saved state/project data
    const getInitialSectionData = (): DraftHeroSection[] => {
        if (typeof imageSectionIndex === 'number' && savedHeroSections.length) {
            // restore from sessionStorage and update with selected image
            const restoredSections = [...savedHeroSections];
            restoredSections[imageSectionIndex].image = selectedImage || undefined;

            setAllowNavigate(false);

            // cleanup session storage after restoring data
            setSelectedImage(null);
            setImageSectionIndex(null);
            setSavedHeroSections([]);

            return restoredSections;
        }

        // normal initialization from project data
        return project.hero_sections || [];
    };

    // draft sections
    const [draftSections, setDraftSections] = useState<DraftHeroSection[]>(() => getInitialSectionData());
    const [isSubmitting, setIsSubmitting] = useState(false);

    // check if form has unsaved changes
    const isDirty = JSON.stringify(draftSections) !== JSON.stringify(project.hero_sections || []);

    // warn user about unsaved changes
    useUnsavedWarning(isDirty && !isSubmitting && allowNavigate);

    // clear session storage after component mounts and state is initialized
    useEffect(() => {
        const timer = setTimeout(() => {
            setSelectedImage(null);
            setImageSectionIndex(null);
            setSavedHeroSections([]);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    // section manipulation
    const addSection = () => {
        setDraftSections([...draftSections, {}]);
    };

    const moveSection = (from: number, to: number) => {
        let reordered = [];
        if (from === to) return;
        else if (from < to)
            reordered = draftSections.slice(0, from).concat(draftSections.slice(from + 1, to + 1), draftSections[from], draftSections.slice(to + 1));
        else reordered = draftSections.slice(0, to).concat(draftSections[from], draftSections.slice(to, from), draftSections.slice(from + 1));

        setDraftSections(reordered);
    };

    const removeSection = (index: number) => {
        setDraftSections(draftSections.filter((_, i) => i !== index));
    };

    const updateSectionData = (index: number, field: keyof DraftHeroSection, value: string | number) => {
        const updatedSections = [...draftSections];
        updatedSections[index] = { ...updatedSections[index], [field]: value };
        setDraftSections(updatedSections);
    };

    // routing utilities
    const reroute = useReroute();
    const imageReroute = useReroute('images');

    // image selection
    const handleImageSelect = (sectionIndex: number, imageID?: number) => {
        // store current state before navigating
        setImageSectionIndex(sectionIndex);
        setSavedHeroSections(draftSections);

        // set return url for reroute after image selection
        imageReroute.setReturnURL();

        setAllowNavigate(true);

        // request image page
        if (imageID) router.get(`/images/${imageID}/edit`);
        else router.get('/images');
    };

    // hero section form component
    const HeroSectionFieldset = ({
        section,
        index,
        errors,
    }: {
        section: DraftHeroSection;
        index: number;
        errors: { image_id?: { message?: string }; heading?: { message?: string }; text?: { message?: string } };
    }) => (
        <fieldset
            className={cn(
                'relative flex w-full flex-col-reverse items-center justify-stretch gap-8 border-y px-8 py-8 md:flex-row md:px-24',
                index % 2 == 1 && 'md:flex-row-reverse',
            )}
        >
            {index > 0 && (
                <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-2 left-2 size-6 rounded-full md:top-8 md:left-8 md:size-8"
                    onClick={() => moveSection(index, index - 1)}
                >
                    <ChevronUp className="size-4 md:size-6" />
                </Button>
            )}
            {index < draftSections.length - 1 && (
                <Button
                    type="button"
                    variant="ghost"
                    className="absolute bottom-2 left-2 size-6 rounded-full md:bottom-8 md:left-8 md:size-8"
                    onClick={() => moveSection(index, index + 1)}
                >
                    <ChevronDown className="size-4 md:size-6" />
                </Button>
            )}
            <input type="number" value={index} name={`hero_sections[${index}].index`} className="hidden" />
            <>
                <input type="number" value={section.image?.id} name={`hero_sections[${index}].image_id`} className="hidden" />
                <Button
                    type="button"
                    onClick={() => handleImageSelect(index, section.image?.id)}
                    className="relative h-full w-full bg-transparent p-0 shadow-none hover:scale-101 md:h-max md:w-auto md:max-w-1/2"
                >
                    {section.image ? (
                        <>
                            <img src={section.image.url} alt="" className="size-full max-h-full rounded object-contain" />
                            <div className="absolute top-0 left-0 size-full rounded bg-primary/65 opacity-0 hover:opacity-100">
                                <span className="absolute top-1/2 left-1/2 -translate-1/2 text-center *:m-2">Click to change</span>
                                <span className="absolute bottom-4 left-1/2 block w-[calc(100%-16px)] -translate-x-1/2 text-center text-xs text-wrap">
                                    {section.image.alt}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="aspect-square w-full rounded bg-primary hover:bg-accent md:aspect-3/4 md:h-100 md:w-auto">
                            <Plus className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    )}
                </Button>
                <InputError>{errors.image_id?.message}</InputError>
            </>
            <article className="w-full">
                <Input
                    name={`hero_sections[${index}].heading`}
                    type="text"
                    className={cn(H2Classes, 'text-2xl!', section.heading && 'border-none text-foreground shadow-none')}
                    defaultValue={section.heading}
                    onBlur={(e) => updateSectionData(index, 'heading', e.target.value)}
                    placeholder="Enter Heading"
                />
                <InputError>{errors.heading?.message}</InputError>
                <TextareaAutosize
                    name={`hero_sections[${index}].text`}
                    className={cn(
                        textAreaStyles,
                        'min-h-15 resize-none',
                        section.text && 'border-none whitespace-pre-wrap text-foreground shadow-none',
                    )}
                    defaultValue={section.text}
                    onBlur={(e) => updateSectionData(index, 'text', e.target.value)}
                    placeholder="add text here"
                />
                <InputError>{errors.text?.message}</InputError>
            </article>
            <Button
                type="button"
                variant="destructive"
                className="absolute top-4 right-0 h-[calc(100%-32px)] w-6 md:right-8 md:w-8"
                onClick={() => removeSection(index)}
            >
                <X />
            </Button>
        </fieldset>
    );

    return (
        <>
            <Head title={project.title} />
            <CenteredContent>
                <H1>{project.title}</H1>
                <span>{project.subtitle}</span>
                <hr className="my-12" />
                <Form
                    method="put"
                    action={`/projects/${project.id}/hero-sections`}
                    className="w-full max-w-250"
                    onSubmit={() => setIsSubmitting(true)}
                    onSuccess={() => setIsSubmitting(false)}
                    onError={() => setIsSubmitting(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            {draftSections.map((section, index) => {
                                const sectionErrors = {
                                    image_id: { message: errors[`hero_sections.${index}.image_id`] as string },
                                    heading: { message: errors[`hero_sections.${index}.heading`] as string },
                                    text: { message: errors[`hero_sections.${index}.text`] as string },
                                };
                                return <HeroSectionFieldset key={index} section={section} index={index} errors={sectionErrors} />;
                            })}
                            <div className="my-12 flex w-full justify-center">
                                <Button type="button" variant="outline" onClick={addSection}>
                                    <Plus />
                                    Add Section
                                </Button>
                            </div>
                            <div className="my-12 flex w-full justify-end gap-4">
                                <CancelButton onClick={reroute.reroute} />
                                <SaveButton type="submit" disabled={processing} />
                            </div>
                        </>
                    )}
                </Form>
            </CenteredContent>
        </>
    );
}
