import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import productReducer from "./productSlice";
import supplierReducer from "./supplierSlice";
import pharmacyReducer from "./pharmacySlice";
import manufacturerReducer from "./manufacturerSlice";
import categoryReducer from "./categorySlice";
import genericReducer from "./genericSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    product: productReducer,
    supplier: supplierReducer,
    pharmacy: pharmacyReducer,
    manufacturer: manufacturerReducer,
    category: categoryReducer,
    generic: genericReducer,
  },
});
