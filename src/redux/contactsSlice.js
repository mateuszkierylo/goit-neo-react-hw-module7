import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

const toggleIsLoading = (state, value) => {
  state.isLoading = value;
};

const setError = (state, value) => {
  state.error = value;
};

const handleRejected = (state, action) => {
  setError(state, action.payload);
  toggleIsLoading(state, false);
};

const handlePending = (state) => {
  toggleIsLoading(state, true);
};

const handleFulfilled = (state) => {
  toggleIsLoading(state, false);
  setError(state, null);
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: { items: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        handleFulfilled(state);
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload];
        handleFulfilled(state);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
        handleFulfilled(state);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items;
export const contactsReducer = contactsSlice.reducer;
