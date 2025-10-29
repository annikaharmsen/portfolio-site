import { router } from '@inertiajs/react';
import { VisitOptions } from 'node_modules/@inertiajs/core';
import useReroute from './use-reroute';

export default function useController<T extends { id: number }>(baseURI: string) {
    const reroute = useReroute();
    return {
        index: () => {
            reroute.setReturnURL();
            router.get(`${baseURI}`);
        },
        show: (model: T) => {
            reroute.setReturnURL();
            router.get(`${baseURI}/${model.id}`);
        },
        create: () => {
            reroute.setReturnURL();
            router.get(`${baseURI}/create`);
        },
        store: (postMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, url?: string) => {
            postMethod(url || `${baseURI}`, {
                onSuccess: reroute.reroute,
            });
        },
        edit: (model: T) => {
            reroute.setReturnURL();
            router.get(`${baseURI}/${model.id}/edit`);
        },
        update: (updateMethod: (url: string, options?: Omit<VisitOptions, 'data'> | undefined) => void, model: T) => {
            updateMethod(`${baseURI}/${model.id}`, {
                onSuccess: reroute.reroute,
            });
        },
        delete: (model: T) => {
            router.delete(`${baseURI}/${model.id}`, {
                preserveState: false,
                onSuccess: reroute.reroute,
            });
        },
        bulk_delete: (modelIDs: number[]) => {
            const quantity = modelIDs.length;
            if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} entr${quantity === 1 ? 'y' : 'ies'}?`)) {
                router.delete(`${baseURI}/bulk-delete`, {
                    data: { ids: modelIDs },
                    onSuccess: reroute.reroute,
                });
            }
        },
    };
}
