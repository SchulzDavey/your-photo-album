import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateProps = {
  activeLink: string;
};

const initialState = {
  activeLink: '',
} as initialStateProps;

export const link = createSlice({
  name: 'link',
  initialState,
  reducers: {
    setActiveLink: (state, { payload }: PayloadAction<string>) => {
      state.activeLink = payload;
    },
  },
});

export const { setActiveLink } = link.actions;
export default link.reducer;
