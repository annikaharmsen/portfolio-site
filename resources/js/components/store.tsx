import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Define the state type
interface IconSelectorState {
    iconList: string[];
}

// Create a slice
const iconSelectorSlice = createSlice({
    name: 'iconSelector',
    initialState: {
        iconList: [],
    } as IconSelectorState,
    reducers: {
        setIconList: (state, action: PayloadAction<string[]>) => {
            state.iconList = action.payload;
        },
    },
});

// Export actions
export const { setIconList } = iconSelectorSlice.actions;

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
