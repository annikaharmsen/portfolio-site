import { sectionHeadingStyles } from '@/lib/styles';
import { MapPin } from 'lucide-react';
import { ReactComponent } from 'node_modules/@inertiajs/react/types/types';

const mainDivStyles = 'grid items-start gap-12 lg:grid-cols-2';
const cardDivStyles =
    'flex h-full flex-col space-y-8 text-lg leading-relaxed text-foreground space-y-6 *:grow *:not-last:px-6 *:justify-center *:border-secondary';
const locationDivStyles = 'mb-4 flex items-center gap-2 text-foreground grow-0!';

export const AboutShell = ({ MainBody, Cards, Location }: { MainBody?: ReactComponent; Cards?: ReactComponent; Location?: ReactComponent }) => (
    <div className="mx-auto max-w-6xl px-6">
        <h2 className={sectionHeadingStyles}>About Me</h2>
        <div className={mainDivStyles}>
            {!!MainBody && (
                <div>
                    <MainBody />
                </div>
            )}
            <div className={cardDivStyles}>
                {!!Cards && <Cards />}
                {!!Location && (
                    <div className={locationDivStyles}>
                        <MapPin className="m-2 size-6" />
                        <Location />
                    </div>
                )}
            </div>
        </div>
    </div>
);
