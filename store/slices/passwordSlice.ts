import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
  name: "password-manager",
  initialState: {
    passwords: [],
    passwordsQuery: [],
    total: 0,
    pages: 1,
    page: 1,
    limit: 6,
  },
  reducers: {
    getAll: (state, action) => {
      state.passwordsQuery = action.payload;
      state.total = action.payload.length;
      state.pages = Math.max(1, Math.ceil(state.total / state.limit));
      state.page = 1;
      state.passwords = state.passwordsQuery.slice(0, state.limit);
    },
    searchPassword: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      const filtered = state.passwordsQuery.filter((password) =>
        password.title.toLowerCase().includes(searchTerm)
      );
      state.total = filtered.length;
      state.pages = Math.max(1, Math.ceil(state.total / state.limit));
      state.page = 1;
      state.passwords = filtered.slice(0, state.limit);
    },
    changePage: (state, action) => {
      const newPage = action.payload;
      if (newPage >= 1 && newPage <= state.pages) {
        state.page = newPage;
        state.passwords = state.passwordsQuery.slice(
          (state.page - 1) * state.limit,
          state.page * state.limit
        );
      }
    },
    addPassword: (state, action) => {
      state.passwordsQuery.push(action.payload);
      state.total++;
      state.pages = Math.max(1, Math.ceil(state.total / state.limit));

      state.page = state.pages;
      state.passwords = state.passwordsQuery.slice(
        (state.page - 1) * state.limit,
        state.page * state.limit
      );
    },
    updatePassword: (state, action) => {
      const index = state.passwordsQuery.findIndex(
        (password) => password.id === action.payload.id
      );
      if (index !== -1) {
        state.passwordsQuery[index] = action.payload;
      }
      state.passwords = state.passwordsQuery.slice(
        (state.page - 1) * state.limit,
        state.page * state.limit
      );
    },
    deletePassword: (state, action) => {
      const index = state.passwordsQuery.findIndex(
        (password) => password.id === action.payload
      );
      if (index !== -1) {
        state.passwordsQuery.splice(index, 1);
        state.total--;
        state.pages = Math.max(1, Math.ceil(state.total / state.limit));

        if ((state.page - 1) * state.limit >= state.total && state.page > 1) {
          state.page--;
        }

        state.passwords = state.passwordsQuery.slice(
          (state.page - 1) * state.limit,
          state.page * state.limit
        );
      }
    },
  },
});

export const {
  getAll,
  searchPassword,
  changePage,
  addPassword,
  updatePassword,
  deletePassword,
} = passwordSlice.actions;

export default passwordSlice.reducer;
