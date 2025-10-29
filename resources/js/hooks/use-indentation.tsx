import { KeyboardEvent } from 'react';

export default function useIndentation(e: KeyboardEvent) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const textbox = e.target as HTMLTextAreaElement | HTMLInputElement;
        const start = textbox.selectionStart ?? 0;
        const end = textbox.selectionEnd ?? 0;

        textbox.value = textbox.value.substring(0, start) + '\t' + textbox.value.substring(end);
        textbox.selectionStart = textbox.selectionEnd = start + 1;
    }
}
