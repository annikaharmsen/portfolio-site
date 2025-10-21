import { router } from '@inertiajs/react';
import { VisitOptions } from 'node_modules/@inertiajs/core';
import useReroute from './use-reroute';

export default function useController<T extends { id: number }>(baseURI: string) {
    const reroute = useReroute();
    return {
        index: () => {
            router.get(baseURI);
        },
        show: (model: T) => {
            router.get(`${baseURI}/${model.id}`);
        },
        create: () => {
            reroute.setReturnURL();
            router.get(`${baseURI}/create`);
        },
        store: (postMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, url: string) => {
            postMethod(url, {
                onSuccess: reroute.reroute,
            });
        },
        edit: (model: T) => {
            reroute.setReturnURL();
            router.get(`${baseURI}/${model.id}/edit`);
        },
        update: (updateMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, url: string) => {
            updateMethod(url, {
                onSuccess: reroute.reroute,
            });
        },
        delete: (model: T) => {
            router.delete(`${baseURI}/${model.id}`, {
                preserveState: false,
                onSuccess: reroute.reroute,
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
