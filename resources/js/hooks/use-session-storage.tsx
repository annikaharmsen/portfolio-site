import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export default function useSessionStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    // Get initial value from sessionStorage or use the provided initialValue
    const readValue = useCallback(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    }, [key, initialValue]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Update sessionStorage when storedValue changes
    useEffect(() => {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error setting sessionStorage key “${key}”:`, error);
        }
    }, [key, storedValue]);

    // Listen for changes from other tabs/windows (optional, for cross-tab sync)
    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [readValue]);

    return [storedValue, setStoredValue];
}
