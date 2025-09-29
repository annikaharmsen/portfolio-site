import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DemoConfig } from '@/types/demo';
import { router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface DemoBannerProps {
    demoConfig: DemoConfig;
}

export default function DemoBanner({ demoConfig }: DemoBannerProps) {
    const [isResetting, setIsResetting] = useState(false);

    const handleReset = async () => {
        if (!confirm('Reset all demo data? This will refresh the page.')) {
            return;
        }

        setIsResetting(true);
        try {
            router.post(
                '/reset',
                {},
                {
                    onSuccess: () => window.location.reload(),
                },
            );
        } catch (error) {
            console.error('Reset error:', error);
            alert('Reset failed. Please try again.');
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <Alert className="mb-6 border-yellow-400 bg-yellow-50">
            <AlertDescription className="flex items-center justify-between">
                <div className="flex-1 text-sm text-yellow-800">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🚧</span>
                        <strong>DEMO MODE</strong>
                        <span>-</span>
                        <span>Feel free to experiment!</span>
                    </div>
                    {demoConfig.reset_at && (
                        <div className="mt-2">
                            <strong>Last reset at:</strong> {new Date(demoConfig.reset_at).toLocaleString()}
                        </div>
                    )}
                    <div className="mt-2">
                        Note that this demo environment is shared globally. Please keep in mind that your example entries may be seen by others.
                    </div>
                </div>
                {demoConfig.allow_manual_reset && (
                    <Button
                        onClick={handleReset}
                        disabled={isResetting}
                        size="sm"
                        variant="outline"
                        className="ml-4 border-yellow-400 text-yellow-700 hover:border-yellow-700 hover:bg-yellow-700 hover:text-background"
                    >
                        <RefreshCw className={`mr-2 h-4 w-4 ${isResetting ? 'animate-spin' : ''}`} />
                        {isResetting ? 'Resetting...' : 'Reset Now'}
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    );
}
