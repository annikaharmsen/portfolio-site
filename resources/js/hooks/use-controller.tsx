import { router } from '@inertiajs/react';

export default function useController<T extends { id: number }>(baseURI: string) {
    return {
        index: () => {
            router.get(`/${baseURI}`);
        },
        show: (model: T) => {
            router.get(`/${baseURI}/${model.id}`);
        },
        create: () => {
            router.get(`/${baseURI}/create`);
        },
        edit: (model: T) => {
            router.get(`/${baseURI}/${model.id}/edit`);
        },
        delete: (model: T) => {
            router.delete(`/${baseURI}/${model.id}`);
        },
        bulk_delete: (modelIDs: number[]) => {
            const quantity = modelIDs.length;
            if (quantity > 0 && confirm(`Are you sure you want to delete ${quantity} entr${quantity === 1 ? 'y' : 'ies'}?`)) {
                router.delete(`/${baseURI}/bulk-delete`, {
                    data: { ids: modelIDs },
                    onSuccess: () => {
                        return true;
                    },
                });
            }
        },
    };
}
