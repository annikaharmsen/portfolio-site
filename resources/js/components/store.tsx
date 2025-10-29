import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Define the state type
interface IconSelectorState {
    searchTerm: string;
    selectedIcon: string | null;
    iconList: string[];
    isOpen: boolean;
}

// Create a slice
const iconSelectorSlice = createSlice({
    name: 'iconSelector',
    initialState: {
        searchTerm: '',
        selectedIcon: null,
        iconList: [],
        isOpen: false,
    } as IconSelectorState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSelectedIcon: (state, action: PayloadAction<string | null>) => {
            state.selectedIcon = action.payload;
        },
        setIconList: (state, action: PayloadAction<string[]>) => {
            state.iconList = action.payload;
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

// Export actions
export const { setSearchTerm, setSelectedIcon, setIconList, setIsOpen } = iconSelectorSlice.actions;

// Create store
export const store = configureStore({
    reducer: {
        iconSelector: iconSelectorSlice.reducer,
    },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
