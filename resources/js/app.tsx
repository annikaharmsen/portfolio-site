import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { ComponentType, ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import AppLayout from './layouts/app-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type InertiaPageModule = {
    default: ComponentType & {
        layout?: (page: ReactElement) => ReactElement;
    };
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob<InertiaPageModule>('./pages/**/*.tsx', {
            eager: true,
        });
        const page = pages[`./pages/${name}.tsx`];
        page.default.layout = name.startsWith('admin/') ? (page) => <AppLayout children={page} /> : undefined;
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
