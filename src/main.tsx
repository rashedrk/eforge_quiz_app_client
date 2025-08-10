import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";
import { persistor, store } from "@/redux/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors closeButton />
        </>
      </PersistGate>
    </Provider>
  </StrictMode>
);
