import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  bookingDetails: {},
  loading: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    sendBookingRequest(state) {
      state.loading = true;
    },
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.loading = false;
    },
    addBookingDetails: (state, action) => {
      state.bookingDetails = action.payload.bookings;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload.bookings;
    },
  },
});

export const { setBookings, addBooking, setBookingDetails } =
  bookingSlice.actions;
export default bookingSlice;
