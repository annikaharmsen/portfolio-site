import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function useUnsavedWarning(warnWhen: boolean) {
    useEffect(() => {
        const confirmUnsavedChanges = () => {
            if (warnWhen) {
                return !confirm('You have unsaved changes. Are you sure you want to leave?');
            }

            return false;
        };

        // Store current URL to restore if user cancels
        const currentUrl = window.location.href;

        // Handle internal navigation (Inertia links/buttons)
        const removeInertiaListener = router.on('before', (event) => {
            if (event.detail.visit.method === 'get' && !event.detail.visit.prefetch) {
                if (confirmUnsavedChanges()) event.preventDefault();
            }
        });

        // Handle browser back/forward navigation
        const handlePopState = () => {
            if (warnWhen) {
                if (confirmUnsavedChanges()) {
                    // Restore the original URL
                    window.history.pushState(null, '', currentUrl);
                }
            }
        };

        // Handle browser refresh/close
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (warnWhen) {
                e.preventDefault();
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            removeInertiaListener();
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [warnWhen]);
}
