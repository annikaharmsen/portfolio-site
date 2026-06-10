import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function titleCase(str: string): string {
    return str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

export function pluralize(str: string): string {
    const rules: Record<string, string> = {
        '(quiz)$': '$1zes',
        '^(ox)$': '$1en',
        '([m|l])ouse$': '$1ice',
        '(matr|vert|ind)ix|ex$': '$1ices',
        '(x|ch|ss|sh)$': '$1es',
        '([^aeiouy]|qu)y$': '$1ies',
        '(hive)$': '$1s',
        '(?:([^f])fe|([lr])f)$': '$1$2ves',
        '(shea|lea|loa|thie)f$': '$1ves',
        sis$: 'ses',
        '([ti])um$': '$1a',
        '(tomat|potat|ech|her|vet)o$': '$1oes',
        '(bu)s$': '$1ses',
        '(alias)$': '$1es',
        '(octop)us$': '$1i',
        '(ax|test)is$': '$1es',
        '(us)$': '$1es',
        '([^s]+)$': '$1s',
    };

    const irregular: Record<string, string> = {
        move: 'moves',
        foot: 'feet',
        goose: 'geese',
        sex: 'sexes',
        child: 'children',
        man: 'men',
        tooth: 'teeth',
        person: 'people',
    };

    const uncountable = ['sheep', 'fish', 'deer', 'moose', 'series', 'species', 'money', 'rice', 'information', 'equipment'];

    if (uncountable.includes(str.toLowerCase())) return str;

    for (const word in irregular) {
        const pattern = new RegExp(word + '$', 'i');
        if (pattern.test(str)) return str.replace(pattern, irregular[word]);
    }

    for (const reg in rules) {
        const pattern = new RegExp(reg, 'i');
        if (pattern.test(str)) return str.replace(pattern, rules[reg]);
    }

    return str;
}

export const openLink = (link: string, e?: React.MouseEvent) => {
    e?.stopPropagation();

    window.open(link);
};

export const resizeImage = (img: File, minHeight = 720, minWidth = 720): Promise<{ file: File; dataUrl: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = function (readerEvent) {
            const imgEl = document.createElement('img');
            imgEl.onload = function () {
                // calculate new dimensions
                let height, width;
                const wToHRatio = imgEl.width / imgEl.height;
                if (wToHRatio > 1) {
                    height = minHeight;
                    width = height * wToHRatio;
                } else {
                    width = minWidth;
                    height = width / wToHRatio;
                }

                // create canvas and get context
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

                // set canvas dimensions
                canvas.height = height;
                canvas.width = width;

                // resize image
                ctx.drawImage(imgEl, 0, 0, width, height);

                // get data URL for preview
                const dataUrl = canvas.toDataURL(img.type);

                // convert canvas to blob and then to file
                canvas.toBlob((blob) => {
                    if (blob) {
                        const resizedFile = new File([blob], img.name, { type: img.type });
                        resolve({ file: resizedFile, dataUrl });
                    } else {
                        reject(new Error('Failed to create blob from canvas'));
                    }
                }, img.type);
            };
            imgEl.onerror = () => reject(new Error('Failed to load image'));
            imgEl.src = readerEvent.target?.result as string;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
    });
};

export const toFileList = (...images: File[]) => {
    const dataTransfer = new DataTransfer();
    images.forEach((img) => dataTransfer.items.add(img));
    return dataTransfer.files;
};
