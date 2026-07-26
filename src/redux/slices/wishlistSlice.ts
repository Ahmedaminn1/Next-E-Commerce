import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistItems: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    addWishlistItem: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeWishlistItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { setWishlistItems, addWishlistItem, removeWishlistItem } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
