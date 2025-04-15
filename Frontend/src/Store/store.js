import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property -slice";
import propertyDetailsSlice from "./PropertyDetails/PropertyDetails-slice";
import userSlice from "./User/User-slice";
import paymentSlice from "./Payment/Payment-slice";
import bookingSlice from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";

const store = configureStore({
  reducer: {
    properties: propertySlice.reducer,
    propertydetails: propertyDetailsSlice.reducer,
    user: userSlice.reducer,
    payment: paymentSlice.reducer,
    booking: bookingSlice.reducer,
    accomodation: accomodationSlice.reducer,
  },
});

export default store;
