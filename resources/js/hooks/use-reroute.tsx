import { router } from '@inertiajs/react';

export default function useReroute(storageKey: string = 'returnURL', defaultReturnURL: string = '/') {
    return {
        setReturnURL: (url: string = window.location.pathname) => {
            sessionStorage.setItem(storageKey, url);
        },
        reroute: () => {
            router.get(sessionStorage.getItem(storageKey) || defaultReturnURL);
        },
    };
}
