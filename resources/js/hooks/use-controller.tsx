import { router } from '@inertiajs/react';
import { RequestPayload, VisitHelperOptions } from 'node_modules/@inertiajs/core';
import useReroute from './use-reroute';

export type BaseURI = `/${string}`;

export default function useController<T extends { id: number }>(baseURI: BaseURI) {
    const { reroute, setReturnURL } = useReroute();
    return {
        index: () => {
            setReturnURL();
            router.get(`${baseURI}`);
        },
        show: (model: T) => {
            router.get(`${baseURI}/${model.id}`);
        },
        create: () => {
            router.get(`${baseURI}/create`);
        },
        store: (data?: RequestPayload, options?: VisitHelperOptions) => {
            router.post(`${baseURI}`, data, options);
        },
        edit: (model: T) => {
            router.get(`${baseURI}/${model.id}/edit`);
        },
        update: (model: T, data?: RequestPayload, options?: VisitHelperOptions) => {
            router.put(`${baseURI}/${model.id}`, data, options);
        },
        delete: (model: T) => {
            router.delete(`${baseURI}/${model.id}`, {
                preserveState: false,
                onSuccess: reroute,
            });
        },
        bulk_delete: (modelIDs: number[]) => {
            const quantity = modelIDs.length;
            if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} entr${quantity === 1 ? 'y' : 'ies'}?`)) {
                router.delete(`${baseURI}/bulk-delete`, {
                    data: { ids: modelIDs },
                    onSuccess: reroute,
                });
            }
        },
    };
}
