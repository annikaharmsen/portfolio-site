import { router } from '@inertiajs/react';
import { VisitOptions } from 'node_modules/@inertiajs/core';

export default function useController<T extends { id: number }>(baseURI: string) {
    return {
        index: () => {
            router.get(baseURI);
        },
        show: (model: T) => {
            router.get(`${baseURI}/${model.id}`);
        },
        create: () => {
            sessionStorage.setItem('returnURL', window.location.pathname);
            router.get(`${baseURI}/create`);
        },
        store: (postMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, url: string) => {
            const returnURL = sessionStorage.getItem('returnURL') || baseURI;
            postMethod(url, {
                onSuccess: () => router.get(returnURL),
            });
        },
        edit: (model: T) => {
            sessionStorage.setItem('returnURL', window.location.pathname);
            router.get(`${baseURI}/${model.id}/edit`);
        },
        update: (updateMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, url: string) => {
            const returnURL = sessionStorage.getItem('returnURL') || baseURI;
            updateMethod(url, {
                onSuccess: () => router.get(returnURL),
            });
        },
        delete: (model: T) => {
            const returnURL = sessionStorage.getItem('returnURL') || baseURI;
            sessionStorage.removeItem('returnURL');
            router.delete(`${baseURI}/${model.id}`, {
                preserveState: false,
                onSuccess: () => {
                    router.get(returnURL);
                },
                onError: (errors) => {
                    console.error('Delete failed:', errors);
                },
            });
        },
        bulk_delete: (modelIDs: number[]) => {
            const quantity = modelIDs.length;
            if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} entr${quantity === 1 ? 'y' : 'ies'}?`)) {
                router.delete(`${baseURI}/bulk-delete`, {
                    data: { ids: modelIDs },
                });
            }
        },
    };
}
